import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, Temple, User } from '../types';
import { theme, spacing, borderRadius, shadows } from '../utils/theme';

type DevoteeDashboardNavigationProp = StackNavigationProp<RootStackParamList, 'DevoteeDashboard'>;

const DevoteeDashboard: React.FC = () => {
  const navigation = useNavigation<DevoteeDashboardNavigationProp>();
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [nearbyTemples, setNearbyTemples] = useState<Temple[]>([]);
  const [popularServices, setPopularServices] = useState<any[]>([]);

  useEffect(() => {
    loadUserData();
    loadNearbyTemples();
    loadPopularServices();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadNearbyTemples = async () => {
    // Mock data for nearby temples
    const mockTemples: Temple[] = [
      {
        id: '1',
        name: 'Shri Lakshmi Narayan Temple',
        description: 'Ancient temple dedicated to Lord Vishnu and Goddess Lakshmi',
        address: '123 Temple Street, Delhi',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
        location: { latitude: 28.6139, longitude: 77.2090 },
        images: ['temple1.jpg'],
        contactNumber: '+91 9876543210',
        email: 'info@lakshminarayan.com',
        deity: 'Lakshmi Narayan',
        openingHours: {},
        services: [],
        providerId: 'provider1',
        rating: 4.5,
        reviews: [],
        facilities: ['Parking', 'Prasadam', 'Wheelchair Access'],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      },
      {
        id: '2',
        name: 'Shri Hanuman Temple',
        description: 'Famous Hanuman temple with evening aarti',
        address: '456 Bhakt Street, Delhi',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110002',
        location: { latitude: 28.6200, longitude: 77.2100 },
        images: ['temple2.jpg'],
        contactNumber: '+91 9876543211',
        email: 'info@hanuman.com',
        deity: 'Hanuman',
        openingHours: {},
        services: [],
        providerId: 'provider2',
        rating: 4.7,
        reviews: [],
        facilities: ['Parking', 'Prasadam', 'Audio System'],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      },
    ];
    setNearbyTemples(mockTemples);
  };

  const loadPopularServices = async () => {
    // Mock data for popular services
    const mockServices = [
      { id: '1', name: 'Special Puja', icon: '🕉️', price: '₹500' },
      { id: '2', name: 'Abhishekam', icon: '🪔', price: '₹300' },
      { id: '3', name: 'Aarti', icon: '🔔', price: '₹100' },
      { id: '4', name: 'Annadanam', icon: '🍽️', price: '₹200' },
    ];
    setPopularServices(mockServices);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a search term');
      return;
    }
    navigation.navigate('TempleSearch');
  };

  const handleTemplePress = (templeId: string) => {
    navigation.navigate('TempleDetails', { templeId });
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleBookingHistory = () => {
    navigation.navigate('BookingHistory');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('Welcome');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

  const renderTempleCard = ({ item }: { item: Temple }) => (
    <TouchableOpacity
      style={styles.templeCard}
      onPress={() => handleTemplePress(item.id)}
    >
      <View style={styles.templeImagePlaceholder}>
        <Text style={styles.templeImageIcon}>🏛️</Text>
      </View>
      <View style={styles.templeInfo}>
        <Text style={styles.templeName}>{item.name}</Text>
        <Text style={styles.templeAddress}>{item.address}</Text>
        <View style={styles.templeRating}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
          <Text style={styles.facilitiesText}>
            {item.facilities.slice(0, 2).join(', ')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderServiceCard = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.serviceCard}>
      <Text style={styles.serviceIcon}>{item.icon}</Text>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.servicePrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      
      {/* Header */}
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Namaste,</Text>
            <Text style={styles.userName}>{user?.name || 'Devotee'}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={handleProfile} style={styles.profileButton}>
              <Text style={styles.profileIcon}>👤</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutIcon}>🚪</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <Animatable.View animation="fadeInUp" delay={100} style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search temples, services, or locations..."
              placeholderTextColor={theme.colors.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
              <Text style={styles.searchIcon}>🔍</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Quick Actions */}
        <Animatable.View animation="fadeInUp" delay={200} style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate('TempleSearch')}>
              <Text style={styles.quickActionIcon}>🔍</Text>
              <Text style={styles.quickActionText}>Find Temples</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={handleBookingHistory}>
              <Text style={styles.quickActionIcon}>📅</Text>
              <Text style={styles.quickActionText}>My Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.quickActionIcon}>⭐</Text>
              <Text style={styles.quickActionText}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Text style={styles.quickActionIcon}>🗺️</Text>
              <Text style={styles.quickActionText}>Nearby</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Popular Services */}
        <Animatable.View animation="fadeInUp" delay={300} style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Popular Services</Text>
          <FlatList
            data={popularServices}
            renderItem={renderServiceCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesList}
          />
        </Animatable.View>

        {/* Nearby Temples */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.templesContainer}>
          <Text style={styles.sectionTitle}>Nearby Temples</Text>
          <FlatList
            data={nearbyTemples}
            renderItem={renderTempleCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.templesList}
          />
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  userName: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    padding: spacing.sm,
    marginRight: spacing.sm,
  },
  profileIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  logoutButton: {
    padding: spacing.sm,
  },
  logoutIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  searchContainer: {
    marginVertical: spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    ...shadows.light,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  },
  searchButton: {
    padding: spacing.md,
  },
  searchIcon: {
    fontSize: 20,
  },
  quickActionsContainer: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: spacing.md,
    marginHorizontal: spacing.xs,
    borderRadius: borderRadius.md,
    ...shadows.light,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  quickActionText: {
    fontSize: 12,
    color: theme.colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  servicesContainer: {
    marginBottom: spacing.lg,
  },
  servicesList: {
    paddingRight: spacing.lg,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginRight: spacing.md,
    alignItems: 'center',
    minWidth: 100,
    ...shadows.light,
  },
  serviceIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  servicePrice: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  templesContainer: {
    marginBottom: spacing.xl,
  },
  templesList: {
    paddingBottom: spacing.lg,
  },
  templeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    ...shadows.light,
  },
  templeImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.md,
    backgroundColor: theme.colors.lightOrange,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  templeImageIcon: {
    fontSize: 40,
  },
  templeInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  templeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.xs,
  },
  templeAddress: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.7,
    marginBottom: spacing.xs,
  },
  templeRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: theme.colors.text,
  },
  facilitiesText: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.6,
  },
});

export default DevoteeDashboard;