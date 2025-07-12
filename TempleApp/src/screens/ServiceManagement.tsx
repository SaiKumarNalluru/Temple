import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { theme, spacing, borderRadius } from '../utils/theme';

type ServiceManagementNavigationProp = StackNavigationProp<RootStackParamList, 'ServiceManagement'>;

const ServiceManagement: React.FC = () => {
  const navigation = useNavigation<ServiceManagementNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Management</Text>
      <Text style={styles.subtitle}>Manage your temple services</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('AddService')}
      >
        <Text style={styles.buttonText}>Add New Service</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text,
    opacity: 0.7,
    marginBottom: spacing.xl,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ServiceManagement;