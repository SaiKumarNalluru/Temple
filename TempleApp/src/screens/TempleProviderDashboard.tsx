import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, User } from '../types';
import { theme, spacing, borderRadius, shadows } from '../utils/theme';

type TempleProviderDashboardNavigationProp = StackNavigationProp<RootStackParamList, 'TempleProviderDashboard'>;

const TempleProviderDashboard: React.FC = () => {
  const navigation = useNavigation<TempleProviderDashboardNavigationProp>();
  const [user, setUser] = useState<User | null>(null);
  const [isTempleRegistered, setIsTempleRegistered] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        // Check if temple is registered (mock check)
        setIsTempleRegistered(false);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleRegisterTemple = () => {
    navigation.navigate('TempleRegistration');
  };

  const handleManageServices = () => {
    navigation.navigate('ServiceManagement');
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('Welcome');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
    }
  };

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
            <Text style={styles.greeting}>Welcome,</Text>
            <Text style={styles.userName}>{user?.name || 'Temple Provider'}</Text>
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
        {!isTempleRegistered ? (
          <Animatable.View animation="fadeInUp" delay={100} style={styles.registrationPrompt}>
            <Text style={styles.promptIcon}>🏛️</Text>
            <Text style={styles.promptTitle}>Register Your Temple</Text>
            <Text style={styles.promptMessage}>
              Get started by registering your temple on our platform. Connect with devotees and manage your services easily.
            </Text>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegisterTemple}>
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.secondary]}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Register Temple</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        ) : (
          <View style={styles.dashboardContent}>
            {/* Temple Overview */}
            <Animatable.View animation="fadeInUp" delay={100} style={styles.overviewContainer}>
              <Text style={styles.sectionTitle}>Temple Overview</Text>
              <View style={styles.overviewCard}>
                <Text style={styles.overviewIcon}>🏛️</Text>
                <Text style={styles.templeName}>Your Temple Name</Text>
                <Text style={styles.templeStatus}>Active • Verified</Text>
              </View>
            </Animatable.View>

            {/* Quick Actions */}
            <Animatable.View animation="fadeInUp" delay={200} style={styles.quickActionsContainer}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.quickActions}>
                <TouchableOpacity style={styles.quickAction} onPress={handleManageServices}>
                  <Text style={styles.quickActionIcon}>⚙️</Text>
                  <Text style={styles.quickActionText}>Manage Services</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickAction}>
                  <Text style={styles.quickActionIcon}>📊</Text>
                  <Text style={styles.quickActionText}>View Analytics</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickAction}>
                  <Text style={styles.quickActionIcon}>📅</Text>
                  <Text style={styles.quickActionText}>Bookings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickAction}>
                  <Text style={styles.quickActionIcon}>💰</Text>
                  <Text style={styles.quickActionText}>Earnings</Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>

            {/* Recent Bookings */}
            <Animatable.View animation="fadeInUp" delay={300} style={styles.bookingsContainer}>
              <Text style={styles.sectionTitle}>Recent Bookings</Text>
              <View style={styles.bookingCard}>
                <Text style={styles.bookingService}>Special Puja</Text>
                <Text style={styles.bookingDate}>Today, 10:00 AM</Text>
                <Text style={styles.bookingStatus}>Confirmed</Text>
              </View>
            </Animatable.View>
          </View>
        )}
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
  registrationPrompt: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  promptIcon: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  promptTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  promptMessage: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.xl,
    opacity: 0.7,
  },
  registerButton: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.light,
  },
  buttonGradient: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dashboardContent: {
    paddingVertical: spacing.lg,
  },
  overviewContainer: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.md,
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    ...shadows.light,
  },
  overviewIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  templeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.xs,
  },
  templeStatus: {
    fontSize: 14,
    color: theme.colors.success,
    fontWeight: '500',
  },
  quickActionsContainer: {
    marginBottom: spacing.lg,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
    ...shadows.light,
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  quickActionText: {
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
    fontWeight: '500',
  },
  bookingsContainer: {
    marginBottom: spacing.lg,
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.light,
  },
  bookingService: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.xs,
  },
  bookingDate: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.7,
    marginBottom: spacing.xs,
  },
  bookingStatus: {
    fontSize: 14,
    color: theme.colors.success,
    fontWeight: '500',
  },
});

export default TempleProviderDashboard;