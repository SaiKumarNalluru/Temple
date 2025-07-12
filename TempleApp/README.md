# Temple Connect - Temple Booking App

A modern React Native app for connecting devotees with temples and managing religious services.

## Features

### For Devotees
- 🏛️ **Discover Temples**: Search and find temples near you
- 📿 **Book Services**: Reserve religious services like puja, abhishekam, aarti
- 🔍 **Advanced Search**: Filter temples by location, deity, services
- ⭐ **Reviews & Ratings**: Read and write reviews for temples
- 📱 **Easy Booking**: Simple and intuitive booking process
- 📅 **Booking History**: Track your past and upcoming bookings
- 🙏 **Spiritual Journey**: Personalized experience for your devotion

### For Temple Providers
- 🏛️ **Temple Registration**: Register your temple on the platform
- ⚙️ **Service Management**: Add and manage temple services
- 💰 **Pricing Control**: Set prices for different services
- 📊 **Analytics**: Track bookings and revenue
- 📅 **Schedule Management**: Manage service timings and availability
- 👥 **Devotee Connection**: Connect with devotees seeking services

## Authentication Features
- 📧 **Email/Password Login**: Traditional authentication
- 🔐 **Google Sign-In**: Quick login with Google account
- 👤 **Face Recognition**: Secure biometric authentication
- 🔄 **User Type Selection**: Choose between Devotee and Temple Provider

## Tech Stack
- **Framework**: React Native with TypeScript
- **Navigation**: React Navigation 6
- **UI Components**: React Native Paper + Custom Components
- **State Management**: React Hooks + AsyncStorage
- **Styling**: Modern gradient designs with custom theme
- **Authentication**: Google Sign-In + Face Recognition
- **Maps**: React Native Maps for location services

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TempleApp
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS dependencies (if running on iOS):
```bash
cd ios && pod install && cd ..
```

4. Start the Metro bundler:
```bash
npm start
```

5. Run the app:
```bash
# For Android
npm run android

# For iOS
npm run ios
```

## Project Structure

```
TempleApp/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # App screens
│   │   ├── WelcomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── SignUpScreen.tsx
│   │   ├── UserTypeSelectionScreen.tsx
│   │   ├── DevoteeDashboard.tsx
│   │   ├── TempleProviderDashboard.tsx
│   │   ├── TempleRegistration.tsx
│   │   ├── TempleSearch.tsx
│   │   ├── TempleDetails.tsx
│   │   ├── ServiceBooking.tsx
│   │   └── ...
│   ├── navigation/         # Navigation configuration
│   ├── services/          # API services
│   ├── utils/             # Utility functions and theme
│   └── types/             # TypeScript type definitions
├── android/               # Android specific files
├── ios/                   # iOS specific files
└── package.json
```

## Key Screens

### Welcome Screen
- Beautiful animated welcome screen with temple theme
- Gradient backgrounds and smooth animations
- Call-to-action to get started

### Authentication
- **Login Screen**: Email/password with Google and Face signin options
- **Sign Up Screen**: Complete registration form with validation
- **User Type Selection**: Choose between Devotee and Temple Provider

### Devotee Dashboard
- Search temples and services
- Quick actions for common tasks
- Popular services showcase
- Nearby temples with ratings

### Temple Provider Dashboard
- Temple registration workflow
- Service management interface
- Booking management
- Analytics and insights

## Theme & Design

The app features a modern temple-themed design with:
- **Primary Colors**: Saffron (#FF6B35) and Orange (#F7931E)
- **Accent Colors**: Golden (#FFD23F) and Temple Brown (#8B4513)
- **Typography**: System fonts with proper hierarchy
- **Animations**: Smooth transitions and micro-interactions
- **Shadows**: Subtle elevation for depth

## Development Guidelines

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Consistent naming conventions
- Proper error handling

### Best Practices
- Responsive design for different screen sizes
- Accessibility considerations
- Performance optimization
- Clean architecture patterns

## Future Enhancements

- 💳 **Payment Integration**: Online payment for services
- 📍 **Real-time Location**: GPS-based temple discovery
- 📺 **Live Streaming**: Watch live temple ceremonies
- 🔔 **Push Notifications**: Booking reminders and updates
- 🗣️ **Multi-language Support**: Regional language options
- 📱 **Offline Mode**: Basic functionality without internet
- 🎯 **Advanced Analytics**: Detailed insights for temple providers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact the development team.

---

**Temple Connect** - Bridging the gap between devotees and temples through technology 🙏