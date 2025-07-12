import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { theme, spacing, borderRadius, shadows } from '../utils/theme';

type TempleDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'TempleDetails'>;
type TempleDetailsRouteProp = RouteProp<RootStackParamList, 'TempleDetails'>;

const TempleDetails: React.FC = () => {
  const navigation = useNavigation<TempleDetailsNavigationProp>();
  const route = useRoute<TempleDetailsRouteProp>();
  const { templeId } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Temple Details</Text>
        <Text style={styles.subtitle}>Temple ID: {templeId}</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Text style={styles.imageIcon}>🏛️</Text>
        </View>
        
        <Text style={styles.templeName}>Shri Lakshmi Narayan Temple</Text>
        <Text style={styles.templeAddress}>123 Temple Street, Delhi</Text>
        
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>Available Services</Text>
          <TouchableOpacity style={styles.serviceItem}>
            <Text style={styles.serviceName}>Special Puja</Text>
            <Text style={styles.servicePrice}>₹500</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceItem}>
            <Text style={styles.serviceName}>Abhishekam</Text>
            <Text style={styles.servicePrice}>₹300</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Service</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text,
    opacity: 0.7,
  },
  content: {
    padding: spacing.lg,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  imageIcon: {
    fontSize: 80,
  },
  templeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  templeAddress: {
    fontSize: 16,
    color: theme.colors.text,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  servicesContainer: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.md,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    ...shadows.light,
  },
  serviceName: {
    fontSize: 16,
    color: theme.colors.text,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  bookButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.light,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TempleDetails;