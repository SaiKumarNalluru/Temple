(function () {
  "use strict";

  // Namespace
  const App = {
    state: {
      currentUser: null,
    },
  };

  // Storage helpers
  function readFromStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }
  function writeToStorage(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
  }
  function uniqueId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  // Seed
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
      { id: uniqueId("temple"), name: "Shri Venkateswara Temple", location: "Tirupati", description: "Famous temple with divine aura." },
      { id: uniqueId("temple"), name: "Meenakshi Amman Temple", location: "Madurai", description: "Historic temple with stunning architecture." },
    ];

    const sampleServices = [
      { id: uniqueId("service"), templeId: sampleTemples[0].id, name: "Archana", amount: 200 },
      { id: uniqueId("service"), templeId: sampleTemples[0].id, name: "Abhishekam", amount: 500 },
      { id: uniqueId("service"), templeId: sampleTemples[1].id, name: "Special Darshan", amount: 300 },
    ];

    writeToStorage("users", [adminUser]);
    writeToStorage("temples", sampleTemples);
    writeToStorage("services", sampleServices);
    writeToStorage("bookings", []);
    writeToStorage("__seeded__", true);
  }

  // Data access
  App.getUsers = () => readFromStorage("users", []);
  App.saveUsers = (users) => writeToStorage("users", users);
  App.getTemples = () => readFromStorage("temples", []);
  App.saveTemples = (temples) => writeToStorage("temples", temples);
  App.getServices = () => readFromStorage("services", []);
  App.saveServices = (services) => writeToStorage("services", services);
  App.getBookings = () => readFromStorage("bookings", []);
  App.saveBookings = (bookings) => writeToStorage("bookings", bookings);
  App.uniqueId = uniqueId;

  // Auth
  function setCurrentUser(user) {
    App.state.currentUser = user;
    writeToStorage("currentUser", user);
    updateHeaderUserState();
  }
  function getCurrentUser() {
    if (App.state.currentUser) return App.state.currentUser;
    const u = readFromStorage("currentUser", null);
    App.state.currentUser = u;
    return u;
  }
  function logout() {
    setCurrentUser(null);
    window.location.href = "/index.html";
  }
  App.setCurrentUser = setCurrentUser;
  App.getCurrentUser = getCurrentUser;
  App.logout = logout;

  // URL helpers
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }
  App.getQueryParam = getQueryParam;

  // Access control
  function requireRole(role) {
    const u = getCurrentUser();
    if (!u || u.role !== role) {
      window.location.href = role === "admin" ? "/admin-login.html" : "/user-login.html";
    }
  }
  App.requireRole = requireRole;

  // Header/nav rendering
  function updateHeaderUserState() {
    const elName = document.getElementById("currentUserInfo");
    const logoutBtn = document.getElementById("logoutBtn");
    const user = getCurrentUser();
    if (!elName || !logoutBtn) return;
    if (user) {
      elName.textContent = `${user.name} (${user.role})`;
      logoutBtn.hidden = false;
    } else {
      elName.textContent = "";
      logoutBtn.hidden = true;
    }

    const adminLinks = document.querySelectorAll('[data-role="admin-link"]');
    const userLinks = document.querySelectorAll('[data-role="user-link"]');
    adminLinks.forEach((a) => a.classList.toggle("hidden", !(user && user.role === "admin")));
    userLinks.forEach((a) => a.classList.toggle("hidden", !(user && user.role === "user")));
  }

  function wireCommonEvents() {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.addEventListener("click", logout);
  }

  function setYear() {
    const y = document.getElementById("yearSpan");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function initCommon() {
    seedIfNeeded();
    setYear();
    updateHeaderUserState();
    wireCommonEvents();
  }

  // Expose globally
  window.TempleApp = App;

  document.addEventListener("DOMContentLoaded", initCommon);
})();