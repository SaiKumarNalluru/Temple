(function () {
  "use strict";

  // Storage helpers
  function readFromStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      console.error("Failed to read from storage", key, err);
      return fallback;
    }
  }
  function writeToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Failed to write to storage", key, err);
    }
  }
  function uniqueId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  // Seed data
  function seedIfNeeded() {
    const seeded = readFromStorage("__seeded__", false);
    if (seeded) return;

    const adminUser = {
      id: uniqueId("user"),
      name: "Administrator",
      email: "admin@temple.com",
      password: "admin123",
      role: "admin",
    };

    const sampleTemples = [
      {
        id: uniqueId("temple"),
        name: "Shri Venkateswara Temple",
        location: "Tirupati",
        description: "Famous temple known for its rich history and divine aura.",
      },
      {
        id: uniqueId("temple"),
        name: "Meenakshi Amman Temple",
        location: "Madurai",
        description: "Historic temple with stunning architecture and spiritual significance.",
      },
    ];

    const sampleServices = [
      {
        id: uniqueId("service"),
        templeId: sampleTemples[0].id,
        name: "Archana",
        amount: 200,
      },
      {
        id: uniqueId("service"),
        templeId: sampleTemples[0].id,
        name: "Abhishekam",
        amount: 500,
      },
      {
        id: uniqueId("service"),
        templeId: sampleTemples[1].id,
        name: "Special Darshan",
        amount: 300,
      },
    ];

    writeToStorage("users", [adminUser]);
    writeToStorage("temples", sampleTemples);
    writeToStorage("services", sampleServices);
    writeToStorage("bookings", []);
    writeToStorage("__seeded__", true);
  }

  // State
  const state = {
    currentUser: null,
    searchQuery: "",
    selectedTempleId: null,
  };

  // Elements
  const el = {
    yearSpan: document.getElementById("yearSpan"),
    currentUserInfo: document.getElementById("currentUserInfo"),
    logoutBtn: document.getElementById("logoutBtn"),

    // Sections
    authSection: document.getElementById("authSection"),
    adminSection: document.getElementById("adminSection"),
    userSection: document.getElementById("userSection"),

    // Tabs
    userTabBtn: document.getElementById("userTabBtn"),
    adminTabBtn: document.getElementById("adminTabBtn"),
    userAuthPanel: document.getElementById("userAuthPanel"),
    adminAuthPanel: document.getElementById("adminAuthPanel"),

    // Auth forms
    userLoginForm: document.getElementById("userLoginForm"),
    userLoginEmail: document.getElementById("userLoginEmail"),
    userLoginPassword: document.getElementById("userLoginPassword"),
    userRegisterForm: document.getElementById("userRegisterForm"),
    registerName: document.getElementById("registerName"),
    registerEmail: document.getElementById("registerEmail"),
    registerPassword: document.getElementById("registerPassword"),

    adminLoginForm: document.getElementById("adminLoginForm"),
    adminLoginEmail: document.getElementById("adminLoginEmail"),
    adminLoginPassword: document.getElementById("adminLoginPassword"),

    // Admin
    addTempleForm: document.getElementById("addTempleForm"),
    templeName: document.getElementById("templeName"),
    templeLocation: document.getElementById("templeLocation"),
    templeDescription: document.getElementById("templeDescription"),
    adminTempleList: document.getElementById("adminTempleList"),

    // User
    searchInput: document.getElementById("searchInput"),
    clearSearchBtn: document.getElementById("clearSearchBtn"),
    userTempleList: document.getElementById("userTempleList"),
    templeDetailPanel: document.getElementById("templeDetailPanel"),
    bookingHistory: document.getElementById("bookingHistory"),
  };

  // Utilities
  function setYear() {
    el.yearSpan.textContent = new Date().getFullYear().toString();
  }

  function setCurrentUser(user) {
    state.currentUser = user;
    writeToStorage("currentUser", user);
    if (user) {
      el.currentUserInfo.textContent = `${user.name} (${user.role})`;
      el.logoutBtn.hidden = false;
    } else {
      el.currentUserInfo.textContent = "";
      el.logoutBtn.hidden = true;
    }
  }

  function getAllUsers() { return readFromStorage("users", []); }
  function saveAllUsers(users) { writeToStorage("users", users); }

  function getAllTemples() { return readFromStorage("temples", []); }
  function saveAllTemples(temples) { writeToStorage("temples", temples); }

  function getAllServices() { return readFromStorage("services", []); }
  function saveAllServices(services) { writeToStorage("services", services); }

  function getAllBookings() { return readFromStorage("bookings", []); }
  function saveAllBookings(bookings) { writeToStorage("bookings", bookings); }

  function showSection(section) {
    el.authSection.hidden = section !== "auth";
    el.adminSection.hidden = section !== "admin";
    el.userSection.hidden = section !== "user";
  }

  // Auth
  function handleUserLogin(evt) {
    evt.preventDefault();
    const email = el.userLoginEmail.value.trim().toLowerCase();
    const password = el.userLoginPassword.value;
    const users = getAllUsers();
    const user = users.find((u) => u.email.toLowerCase() === email && u.password === password && u.role === "user");
    if (!user) {
      alert("Invalid user credentials.");
      return;
    }
    setCurrentUser(user);
    showSection("user");
    renderUserView();
  }

  function handleAdminLogin(evt) {
    evt.preventDefault();
    const email = el.adminLoginEmail.value.trim().toLowerCase();
    const password = el.adminLoginPassword.value;
    const users = getAllUsers();
    const admin = users.find((u) => u.email.toLowerCase() === email && u.password === password && u.role === "admin");
    if (!admin) {
      alert("Invalid admin credentials.");
      return;
    }
    setCurrentUser(admin);
    showSection("admin");
    renderAdminView();
  }

  function handleRegister(evt) {
    evt.preventDefault();
    const name = el.registerName.value.trim();
    const email = el.registerEmail.value.trim().toLowerCase();
    const password = el.registerPassword.value;
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    const users = getAllUsers();
    if (users.some((u) => u.email.toLowerCase() === email)) {
      alert("Email already registered.");
      return;
    }
    const user = { id: uniqueId("user"), name, email, password, role: "user" };
    users.push(user);
    saveAllUsers(users);
    alert("Account created. You can now log in.");
    el.userLoginEmail.value = email;
    el.userLoginPassword.value = "";
    el.registerName.value = "";
    el.registerEmail.value = "";
    el.registerPassword.value = "";
  }

  function handleLogout() {
    setCurrentUser(null);
    state.selectedTempleId = null;
    showSection("auth");
  }

  // Tabs
  function switchAuthTab(targetPanelId) {
    for (const btn of [el.userTabBtn, el.adminTabBtn]) {
      btn.classList.toggle("active", btn.dataset.tab === targetPanelId);
    }
    el.userAuthPanel.classList.toggle("active", targetPanelId === "userAuthPanel");
    el.adminAuthPanel.classList.toggle("active", targetPanelId === "adminAuthPanel");
  }

  // Admin: Temples
  function handleAddTemple(evt) {
    evt.preventDefault();
    const name = el.templeName.value.trim();
    const location = el.templeLocation.value.trim();
    const description = el.templeDescription.value.trim();
    if (!name || !location) return;
    const temples = getAllTemples();
    const newTemple = { id: uniqueId("temple"), name, location, description };
    temples.push(newTemple);
    saveAllTemples(temples);
    el.templeName.value = "";
    el.templeLocation.value = "";
    el.templeDescription.value = "";
    renderAdminTempleList();
    renderUserTempleList();
  }

  function handleDeleteTemple(templeId) {
    if (!confirm("Delete this temple and its services/bookings?")) return;
    const temples = getAllTemples().filter((t) => t.id !== templeId);
    saveAllTemples(temples);
    const services = getAllServices().filter((s) => s.templeId !== templeId);
    saveAllServices(services);
    const bookings = getAllBookings().filter((b) => b.templeId !== templeId);
    saveAllBookings(bookings);
    if (state.selectedTempleId === templeId) state.selectedTempleId = null;
    renderAdminTempleList();
    renderUserView();
  }

  function handleAddService(templeId, form) {
    const nameInput = form.querySelector('[name="serviceName"]');
    const amountInput = form.querySelector('[name="serviceAmount"]');
    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);
    if (!name || !Number.isFinite(amount) || amount <= 0) {
      alert("Enter valid service name and amount.");
      return;
    }
    const services = getAllServices();
    services.push({ id: uniqueId("service"), templeId, name, amount });
    saveAllServices(services);
    nameInput.value = "";
    amountInput.value = "";
    renderAdminTempleList();
    if (state.selectedTempleId === templeId) renderTempleDetails(templeId);
  }

  function handleDeleteService(serviceId) {
    const services = getAllServices().filter((s) => s.id !== serviceId);
    saveAllServices(services);
    const bookings = getAllBookings().filter((b) => b.serviceId !== serviceId);
    saveAllBookings(bookings);
    renderAdminTempleList();
    if (state.selectedTempleId) renderTempleDetails(state.selectedTempleId);
  }

  function renderAdminTempleList() {
    const temples = getAllTemples();
    const services = getAllServices();
    if (temples.length === 0) {
      el.adminTempleList.innerHTML = '<div class="muted">No temples yet. Add one using the form.</div>';
      return;
    }

    el.adminTempleList.innerHTML = temples.map((t) => {
      const tServices = services.filter((s) => s.templeId === t.id);
      const serviceRows = tServices.map((s) => `
        <div class="list-item">
          <div class="service-row"><span>${s.name}</span><span class="price">₹${s.amount.toFixed(2)}</span></div>
          <div class="actions">
            <button class="btn btn-danger" data-action="delete-service" data-service-id="${s.id}">Delete</button>
          </div>
        </div>
      `).join("");

      return `
        <div class="card" data-temple-id="${t.id}">
          <div class="list-item">
            <div>
              <strong>${t.name}</strong>
              <div class="muted small">${t.location}</div>
            </div>
            <div class="actions">
              <button class="btn btn-ghost" data-action="toggle-services">Manage Services</button>
              <button class="btn btn-danger" data-action="delete-temple">Delete</button>
            </div>
          </div>
          <div class="card flat hidden" data-role="services-panel">
            <form class="form" data-role="add-service-form">
              <div class="grid two">
                <label>Service Name
                  <input type="text" name="serviceName" placeholder="e.g., Archana" required />
                </label>
                <label>Amount (₹)
                  <input type="number" name="serviceAmount" min="1" placeholder="100" required />
                </label>
              </div>
              <button type="submit" class="btn btn-primary">Add Service</button>
            </form>
            <hr class="sep" />
            <div class="list">${serviceRows || '<div class="muted">No services yet.</div>'}</div>
          </div>
        </div>
      `;
    }).join("");
  }

  // User: search + list + details + booking + history
  function renderUserTempleList() {
    const query = state.searchQuery.toLowerCase();
    const temples = getAllTemples().filter((t) =>
      t.name.toLowerCase().includes(query) || t.location.toLowerCase().includes(query)
    );
    if (temples.length === 0) {
      el.userTempleList.innerHTML = '<div class="card-item">No temples match your search.</div>';
      return;
    }
    el.userTempleList.innerHTML = temples.map((t) => `
      <div class="card-item">
        <h4>${t.name}</h4>
        <div class="badge">${t.location}</div>
        <p class="small">${t.description || ""}</p>
        <div>
          <button class="btn btn-primary" data-action="view-temple" data-temple-id="${t.id}">View</button>
        </div>
      </div>
    `).join("");
  }

  function renderTempleDetails(templeId) {
    const temples = getAllTemples();
    const services = getAllServices();
    const temple = temples.find((t) => t.id === templeId);
    if (!temple) {
      el.templeDetailPanel.innerHTML = '<p class="muted">Temple not found.</p>';
      return;
    }
    state.selectedTempleId = templeId;
    const tServices = services.filter((s) => s.templeId === templeId);

    const optionsHtml = tServices.map((s) => `<option value="${s.id}">${s.name} — ₹${s.amount.toFixed(2)}</option>`).join("");
    const servicesList = tServices.map((s) => `<div class="service-row"><span>${s.name}</span><span class="price">₹${s.amount.toFixed(2)}</span></div>`).join("");

    const disabled = tServices.length === 0 ? "disabled" : "";

    el.templeDetailPanel.classList.remove("muted");
    el.templeDetailPanel.innerHTML = `
      <div class="card flat">
        <h3>${temple.name}</h3>
        <div class="badge">${temple.location}</div>
        <p class="small">${temple.description || ""}</p>
        <hr class="sep" />
        <h4>Services</h4>
        <div class="list">${servicesList || '<div class="muted">No services available.</div>'}</div>
        <hr class="sep" />
        <h4>Book a Service</h4>
        <form id="bookingForm" class="form">
          <label>Service
            <select id="bookingService" required ${disabled}>
              <option value="" disabled selected>Select a service</option>
              ${optionsHtml}
            </select>
          </label>
          <div class="grid two">
            <label>Date
              <input type="date" id="bookingDate" required ${disabled} />
            </label>
            <label>Time
              <input type="time" id="bookingTime" required ${disabled} />
            </label>
          </div>
          <button type="submit" class="btn btn-primary" ${disabled}>Book</button>
        </form>
      </div>
    `;

    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) bookingForm.addEventListener("submit", handleCreateBooking);
  }

  function handleCreateBooking(evt) {
    evt.preventDefault();
    if (!state.currentUser || state.currentUser.role !== "user") {
      alert("Please log in as a user to book.");
      return;
    }
    const serviceId = document.getElementById("bookingService").value;
    const date = document.getElementById("bookingDate").value;
    const time = document.getElementById("bookingTime").value;
    if (!serviceId || !date || !time) return;

    const bookings = getAllBookings();
    const duplicate = bookings.find((b) => b.userId === state.currentUser.id && b.serviceId === serviceId && b.date === date && b.time === time);
    if (duplicate) {
      alert("You already booked this service at the same time.");
      return;
    }

    const temples = getAllTemples();
    const services = getAllServices();
    const service = services.find((s) => s.id === serviceId);
    const templeId = service ? service.templeId : state.selectedTempleId;

    bookings.push({
      id: uniqueId("booking"),
      userId: state.currentUser.id,
      templeId,
      serviceId,
      date,
      time,
      status: "CONFIRMED",
      createdAt: new Date().toISOString(),
    });
    saveAllBookings(bookings);
    alert("Booking confirmed.");
    renderBookingHistory();
  }

  function renderBookingHistory() {
    if (!state.currentUser || state.currentUser.role !== "user") {
      el.bookingHistory.innerHTML = '<div class="muted">Log in to see your bookings.</div>';
      return;
    }
    const bookings = getAllBookings().filter((b) => b.userId === state.currentUser.id);
    const temples = getAllTemples();
    const services = getAllServices();

    if (bookings.length === 0) {
      el.bookingHistory.innerHTML = '<div class="muted">No bookings yet.</div>';
      return;
    }

    el.bookingHistory.innerHTML = bookings
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .map((b) => {
        const temple = temples.find((t) => t.id === b.templeId);
        const service = services.find((s) => s.id === b.serviceId);
        return `
          <div class="list-item" data-booking-id="${b.id}">
            <div>
              <div><strong>${service ? service.name : "Service"}</strong> at ${temple ? temple.name : "Temple"}</div>
              <div class="small muted">${b.date} • ${b.time} • ₹${service ? service.amount.toFixed(2) : "-"}</div>
            </div>
            <div class="actions">
              <span class="badge">${b.status}</span>
              <button class="btn btn-ghost" data-action="cancel-booking">Cancel</button>
            </div>
          </div>
        `;
      }).join("");
  }

  function handleCancelBooking(bookingId) {
    if (!confirm("Cancel this booking?")) return;
    const bookings = getAllBookings();
    const idx = bookings.findIndex((b) => b.id === bookingId && b.userId === state.currentUser.id);
    if (idx >= 0) {
      bookings.splice(idx, 1);
      saveAllBookings(bookings);
      renderBookingHistory();
    }
  }

  // Render entry points
  function renderAdminView() {
    renderAdminTempleList();
  }
  function renderUserView() {
    renderUserTempleList();
    if (state.selectedTempleId) renderTempleDetails(state.selectedTempleId);
    renderBookingHistory();
  }

  // Event wiring
  function wireEvents() {
    el.logoutBtn.addEventListener("click", handleLogout);

    el.userTabBtn.addEventListener("click", () => switchAuthTab("userAuthPanel"));
    el.adminTabBtn.addEventListener("click", () => switchAuthTab("adminAuthPanel"));

    el.userLoginForm.addEventListener("submit", handleUserLogin);
    el.userRegisterForm.addEventListener("submit", handleRegister);
    el.adminLoginForm.addEventListener("submit", handleAdminLogin);

    el.addTempleForm.addEventListener("submit", handleAddTemple);

    el.adminTempleList.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const card = target.closest(".card");
      if (!card) return;
      const templeId = card.getAttribute("data-temple-id");
      if (!templeId) return;

      const action = target.getAttribute("data-action");
      if (action === "delete-temple") {
        handleDeleteTemple(templeId);
      } else if (action === "toggle-services") {
        const panel = card.querySelector('[data-role="services-panel"]');
        if (panel) panel.classList.toggle("hidden");
      } else if (action === "delete-service") {
        const serviceId = target.getAttribute("data-service-id");
        if (serviceId) handleDeleteService(serviceId);
      }
    });

    el.adminTempleList.addEventListener("submit", (e) => {
      const form = e.target;
      if (!(form instanceof HTMLFormElement)) return;
      if (form.getAttribute("data-role") !== "add-service-form") return;
      e.preventDefault();
      const card = form.closest(".card");
      const templeId = card ? card.getAttribute("data-temple-id") : null;
      if (!templeId) return;
      handleAddService(templeId, form);
    });

    el.searchInput.addEventListener("input", () => {
      state.searchQuery = el.searchInput.value;
      renderUserTempleList();
    });

    el.clearSearchBtn.addEventListener("click", () => {
      state.searchQuery = "";
      el.searchInput.value = "";
      renderUserTempleList();
    });

    el.userTempleList.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const action = target.getAttribute("data-action");
      if (action !== "view-temple") return;
      const templeId = target.getAttribute("data-temple-id");
      if (templeId) renderTempleDetails(templeId);
    });

    el.bookingHistory.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const action = target.getAttribute("data-action");
      if (action !== "cancel-booking") return;
      const item = target.closest(".list-item");
      const bookingId = item ? item.getAttribute("data-booking-id") : null;
      if (bookingId) handleCancelBooking(bookingId);
    });
  }

  // Init
  function init() {
    setYear();
    seedIfNeeded();
    wireEvents();
    const storedUser = readFromStorage("currentUser", null);
    if (storedUser) {
      setCurrentUser(storedUser);
      if (storedUser.role === "admin") {
        showSection("admin");
        renderAdminView();
      } else {
        showSection("user");
        renderUserView();
      }
    } else {
      showSection("auth");
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();