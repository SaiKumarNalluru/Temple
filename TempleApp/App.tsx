import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import UserTypeSelectionScreen from './src/screens/UserTypeSelectionScreen';
import DevoteeDashboard from './src/screens/DevoteeDashboard';
import TempleProviderDashboard from './src/screens/TempleProviderDashboard';
import TempleRegistration from './src/screens/TempleRegistration';
import TempleSearch from './src/screens/TempleSearch';
import TempleDetails from './src/screens/TempleDetails';
import ServiceBooking from './src/screens/ServiceBooking';
import BookingConfirmation from './src/screens/BookingConfirmation';
import Profile from './src/screens/Profile';
import ServiceManagement from './src/screens/ServiceManagement';
import AddService from './src/screens/AddService';
import EditService from './src/screens/EditService';
import BookingHistory from './src/screens/BookingHistory';
import Reviews from './src/screens/Reviews';

// Types
import { RootStackParamList, User } from './src/types';

// Theme
import { theme } from './src/utils/theme';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInitialRouteName = () => {
    if (isLoading) return 'Welcome';
    if (!user) return 'Welcome';
    
    if (user.userType === 'devotee') {
      return 'DevoteeDashboard';
    } else if (user.userType === 'temple_provider') {
      return 'TempleProviderDashboard';
    }
    return 'Welcome';
  };

  return (
    <PaperProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={getInitialRouteName()}
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="SignUp" 
            component={SignUpScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="UserTypeSelection" 
            component={UserTypeSelectionScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="DevoteeDashboard" 
            component={DevoteeDashboard} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="TempleProviderDashboard" 
            component={TempleProviderDashboard} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="TempleRegistration" 
            component={TempleRegistration} 
            options={{ title: 'Register Temple' }}
          />
          <Stack.Screen 
            name="TempleSearch" 
            component={TempleSearch} 
            options={{ title: 'Search Temples' }}
          />
          <Stack.Screen 
            name="TempleDetails" 
            component={TempleDetails} 
            options={{ title: 'Temple Details' }}
          />
          <Stack.Screen 
            name="ServiceBooking" 
            component={ServiceBooking} 
            options={{ title: 'Book Service' }}
          />
          <Stack.Screen 
            name="BookingConfirmation" 
            component={BookingConfirmation} 
            options={{ title: 'Booking Confirmation' }}
          />
          <Stack.Screen 
            name="Profile" 
            component={Profile} 
            options={{ title: 'Profile' }}
          />
          <Stack.Screen 
            name="ServiceManagement" 
            component={ServiceManagement} 
            options={{ title: 'Manage Services' }}
          />
          <Stack.Screen 
            name="AddService" 
            component={AddService} 
            options={{ title: 'Add Service' }}
          />
          <Stack.Screen 
            name="EditService" 
            component={EditService} 
            options={{ title: 'Edit Service' }}
          />
          <Stack.Screen 
            name="BookingHistory" 
            component={BookingHistory} 
            options={{ title: 'Booking History' }}
          />
          <Stack.Screen 
            name="Reviews" 
            component={Reviews} 
            options={{ title: 'Reviews' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;