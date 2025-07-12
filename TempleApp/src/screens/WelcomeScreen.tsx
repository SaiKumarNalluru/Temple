import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { RootStackParamList } from '../types';
import { theme, spacing, borderRadius } from '../utils/theme';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const { width, height } = Dimensions.get('window');

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleGetStarted = () => {
    navigation.navigate('Login');
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
          {/* Temple Icon Animation */}
          <Animatable.View animation="pulse" iterationCount="infinite" duration={2000}>
            <View style={styles.iconContainer}>
              <Text style={styles.templeIcon}>🕉️</Text>
            </View>
          </Animatable.View>

          {/* Welcome Text */}
          <Animated.View
            style={[
              styles.textContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.appName}>Temple Connect</Text>
            <Text style={styles.subtitle}>
              Connect with Divine Temples{'\n'}
              Book Services • Find Peace • Seek Blessings
            </Text>
          </Animated.View>

          {/* Features */}
          <Animated.View
            style={[
              styles.featuresContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🏛️</Text>
              <Text style={styles.featureText}>Discover Temples</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📿</Text>
              <Text style={styles.featureText}>Book Services</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🙏</Text>
              <Text style={styles.featureText}>Seek Blessings</Text>
            </View>
          </Animated.View>

          {/* Get Started Button */}
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
              <LinearGradient
                colors={['#FFFFFF', '#F5F5F5']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Get Started</Text>
                <Text style={styles.buttonArrow}>→</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Decorative Elements */}
        <View style={styles.decorativeElements}>
          <Animatable.View
            animation="rotate"
            iterationCount="infinite"
            duration={20000}
            style={[styles.decorativeCircle, styles.circle1]}
          />
          <Animatable.View
            animation="rotate"
            iterationCount="infinite"
            duration={15000}
            style={[styles.decorativeCircle, styles.circle2]}
          />
          <Animatable.View
            animation="rotate"
            iterationCount="infinite"
            duration={25000}
            style={[styles.decorativeCircle, styles.circle3]}
          />
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    zIndex: 1,
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  templeIcon: {
    fontSize: 80,
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  welcomeText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '300',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  appName: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: spacing.xxl,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 30,
    marginBottom: spacing.sm,
  },
  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  getStartedButton: {
    width: '80%',
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  circle1: {
    width: 200,
    height: 200,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: -75,
    left: -75,
  },
  circle3: {
    width: 100,
    height: 100,
    top: height * 0.3,
    right: -50,
  },
});

export default WelcomeScreen;