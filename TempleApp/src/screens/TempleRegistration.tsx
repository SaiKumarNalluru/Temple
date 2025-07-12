import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { theme, spacing, borderRadius, shadows } from '../utils/theme';

type TempleRegistrationNavigationProp = StackNavigationProp<RootStackParamList, 'TempleRegistration'>;

const TempleRegistration: React.FC = () => {
  const navigation = useNavigation<TempleRegistrationNavigationProp>();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    contactNumber: '',
    email: '',
    deity: '',
    website: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    Alert.alert('Success', 'Temple registration submitted for review!', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Register Your Temple</Text>
        <Text style={styles.subtitle}>Fill in the details about your temple</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Temple Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            placeholder="Enter temple name"
            placeholderTextColor={theme.colors.placeholder}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(value) => handleInputChange('description', value)}
            placeholder="Brief description of your temple"
            placeholderTextColor={theme.colors.placeholder}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address *</Text>
          <TextInput
            style={styles.input}
            value={formData.address}
            onChangeText={(value) => handleInputChange('address', value)}
            placeholder="Complete address"
            placeholderTextColor={theme.colors.placeholder}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputContainer, styles.halfWidth]}>
            <Text style={styles.label}>City *</Text>
            <TextInput
              style={styles.input}
              value={formData.city}
              onChangeText={(value) => handleInputChange('city', value)}
              placeholder="City"
              placeholderTextColor={theme.colors.placeholder}
            />
          </View>

          <View style={[styles.inputContainer, styles.halfWidth]}>
            <Text style={styles.label}>State *</Text>
            <TextInput
              style={styles.input}
              value={formData.state}
              onChangeText={(value) => handleInputChange('state', value)}
              placeholder="State"
              placeholderTextColor={theme.colors.placeholder}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pincode *</Text>
          <TextInput
            style={styles.input}
            value={formData.pincode}
            onChangeText={(value) => handleInputChange('pincode', value)}
            placeholder="Pincode"
            placeholderTextColor={theme.colors.placeholder}
            keyboardType="numeric"
            maxLength={6}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact Number *</Text>
          <TextInput
            style={styles.input}
            value={formData.contactNumber}
            onChangeText={(value) => handleInputChange('contactNumber', value)}
            placeholder="Contact number"
            placeholderTextColor={theme.colors.placeholder}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholder="Email address"
            placeholderTextColor={theme.colors.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Main Deity *</Text>
          <TextInput
            style={styles.input}
            value={formData.deity}
            onChangeText={(value) => handleInputChange('deity', value)}
            placeholder="Main deity worshipped"
            placeholderTextColor={theme.colors.placeholder}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Website (Optional)</Text>
          <TextInput
            style={styles.input}
            value={formData.website}
            onChangeText={(value) => handleInputChange('website', value)}
            placeholder="Website URL"
            placeholderTextColor={theme.colors.placeholder}
            keyboardType="url"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Register Temple</Text>
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
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text,
    opacity: 0.7,
    textAlign: 'center',
  },
  form: {
    padding: spacing.lg,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    color: theme.colors.text,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.lg,
    ...shadows.light,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TempleRegistration;