import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme, spacing } from '../utils/theme';

const EditService: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Service</Text>
      <Text style={styles.subtitle}>Edit temple service details</Text>
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
    textAlign: 'center',
  },
});

export default EditService;