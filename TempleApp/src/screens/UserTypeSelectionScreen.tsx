import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, UserType } from '../types';
import { theme, spacing, borderRadius, shadows } from '../utils/theme';

type UserTypeSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserTypeSelection'>;

const UserTypeSelectionScreen: React.FC = () => {
  const navigation = useNavigation<UserTypeSelectionScreenNavigationProp>();
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTypeSelection = (type: UserType) => {
    setSelectedType(type);
  };

  const handleContinue = async () => {
    if (!selectedType) {
      Alert.alert('Error', 'Please select a user type');
      return;
    }

    setIsLoading(true);
    try {
      // Update user data with selected type
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        user.userType = selectedType;
        await AsyncStorage.setItem('user', JSON.stringify(user));
      }

      // Navigate based on selected type
      if (selectedType === 'devotee') {
        navigation.navigate('DevoteeDashboard');
      } else {
        navigation.navigate('TempleProviderDashboard');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save user type. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
      
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary, theme.colors.accent]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <Animatable.View animation="fadeInDown" duration={1000} style={styles.header}>
            <Text style={styles.title}>Choose Your Role</Text>
            <Text style={styles.subtitle}>Select how you want to use Temple Connect</Text>
          </Animatable.View>

          <View style={styles.optionsContainer}>
            <Animatable.View animation="fadeInLeft" delay={200} duration={1000}>
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  selectedType === 'devotee' && styles.selectedCard,
                ]}
                onPress={() => handleTypeSelection('devotee')}
              >
                <View style={styles.iconContainer}>
                  <Text style={styles.optionIcon}>🙏</Text>
                </View>
                <Text style={styles.optionTitle}>Devotee</Text>
                <Text style={styles.optionDescription}>
                  Search for temples, book services, and connect with your spiritual journey
                </Text>
                <View style={styles.featuresList}>
                  <Text style={styles.featureItem}>• Discover nearby temples</Text>
                  <Text style={styles.featureItem}>• Book religious services</Text>
                  <Text style={styles.featureItem}>• Get darshan timings</Text>
                  <Text style={styles.featureItem}>• Read reviews & ratings</Text>
                </View>
              </TouchableOpacity>
            </Animatable.View>

            <Animatable.View animation="fadeInRight" delay={400} duration={1000}>
              <TouchableOpacity
                style={[
                  styles.optionCard,
                  selectedType === 'temple_provider' && styles.selectedCard,
                ]}
                onPress={() => handleTypeSelection('temple_provider')}
              >
                <View style={styles.iconContainer}>
                  <Text style={styles.optionIcon}>🏛️</Text>
                </View>
                <Text style={styles.optionTitle}>Temple Provider</Text>
                <Text style={styles.optionDescription}>
                  Register your temple and manage services for devotees
                </Text>
                <View style={styles.featuresList}>
                  <Text style={styles.featureItem}>• Register your temple</Text>
                  <Text style={styles.featureItem}>• Manage services & timings</Text>
                  <Text style={styles.featureItem}>• Handle bookings</Text>
                  <Text style={styles.featureItem}>• Connect with devotees</Text>
                </View>
              </TouchableOpacity>
            </Animatable.View>
          </View>

          <Animatable.View animation="fadeInUp" delay={600} duration={1000} style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                !selectedType && styles.disabledButton,
                isLoading && styles.disabledButton,
              ]}
              onPress={handleContinue}
              disabled={!selectedType || isLoading}
            >
              <LinearGradient
                colors={['#FFFFFF', '#F5F5F5']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'Setting up...' : 'Continue'}
                </Text>
                <Text style={styles.buttonArrow}>→</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.sm,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  optionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.medium,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: theme.colors.accent,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    transform: [{ scale: 1.02 }],
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  optionIcon: {
    fontSize: 48,
  },
  optionTitle: {
    fontSize: 24,
    color: theme.colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  optionDescription: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.md,
    opacity: 0.8,
  },
  featuresList: {
    alignItems: 'flex-start',
  },
  featureItem: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: spacing.xs,
    opacity: 0.7,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  continueButton: {
    width: '80%',
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.light,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonGradient: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginRight: spacing.sm,
  },
  buttonArrow: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default UserTypeSelectionScreen;