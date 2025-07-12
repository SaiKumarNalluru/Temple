// User Types
export type UserType = 'devotee' | 'temple_provider';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  profileImage?: string;
  userType: UserType;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DevoteeProfile extends User {
  userType: 'devotee';
  favoriteTemples: string[];
  bookingHistory: Booking[];
  preferences: {
    preferredLanguage: string;
    notificationEnabled: boolean;
    location?: {
      latitude: number;
      longitude: number;
    };
  };
}

export interface TempleProviderProfile extends User {
  userType: 'temple_provider';
  templeId?: string;
  isTempleRegistered: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

// Temple Types
export interface Temple {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  location: {
    latitude: number;
    longitude: number;
  };
  images: string[];
  contactNumber: string;
  email: string;
  website?: string;
  deity: string;
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
  services: TempleService[];
  providerId: string;
  rating: number;
  reviews: Review[];
  facilities: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// Service Types
export interface TempleService {
  id: string;
  templeId: string;
  name: string;
  description: string;
  category: ServiceCategory;
  price: number;
  duration: number; // in minutes
  availability: ServiceAvailability[];
  maxBookings: number;
  currentBookings: number;
  images: string[];
  isActive: boolean;
  requirements?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type ServiceCategory = 
  | 'pooja'
  | 'archana'
  | 'abhishekam'
  | 'special_pooja'
  | 'darshan'
  | 'annadanam'
  | 'other';

export interface ServiceAvailability {
  day: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxBookings: number;
  currentBookings: number;
}

// Booking Types
export interface Booking {
  id: string;
  userId: string;
  templeId: string;
  serviceId: string;
  bookingDate: Date;
  timeSlot: TimeSlot;
  status: BookingStatus;
  devoteeDetails: {
    name: string;
    phone: string;
    email: string;
    numberOfPeople: number;
    specialRequests?: string;
  };
  paymentDetails: {
    amount: number;
    transactionId: string;
    paymentMethod: string;
    status: 'pending' | 'completed' | 'failed';
  };
  createdAt: Date;
  updatedAt: Date;
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'no_show';

// Review Types
export interface Review {
  id: string;
  userId: string;
  templeId: string;
  serviceId?: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Navigation Types
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  UserTypeSelection: undefined;
  DevoteeDashboard: undefined;
  TempleProviderDashboard: undefined;
  TempleRegistration: undefined;
  TempleSearch: undefined;
  TempleDetails: { templeId: string };
  ServiceBooking: { serviceId: string; templeId: string };
  BookingConfirmation: { bookingId: string };
  Profile: undefined;
  ServiceManagement: undefined;
  AddService: undefined;
  EditService: { serviceId: string };
  BookingHistory: undefined;
  Reviews: { templeId: string };
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Bookings: undefined;
  Profile: undefined;
};

// Authentication Types
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  userType: UserType;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}