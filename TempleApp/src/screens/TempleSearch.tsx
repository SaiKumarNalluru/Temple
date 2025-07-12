import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { theme, spacing, borderRadius, shadows } from '../utils/theme';

type TempleSearchNavigationProp = StackNavigationProp<RootStackParamList, 'TempleSearch'>;

const TempleSearch: React.FC = () => {
  const navigation = useNavigation<TempleSearchNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = () => {
    // Mock search results
    const mockResults = [
      { id: '1', name: 'Shri Lakshmi Narayan Temple', location: 'Delhi', rating: 4.5 },
      { id: '2', name: 'Shri Hanuman Temple', location: 'Mumbai', rating: 4.7 },
    ];
    setSearchResults(mockResults);
  };

  const renderTempleItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.templeItem}
      onPress={() => navigation.navigate('TempleDetails', { templeId: item.id })}
    >
      <Text style={styles.templeName}>{item.name}</Text>
      <Text style={styles.templeLocation}>{item.location}</Text>
      <Text style={styles.templeRating}>⭐ {item.rating}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search temples..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={searchResults}
        renderItem={renderTempleItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.resultsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginRight: spacing.sm,
  },
  searchButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  resultsList: {
    paddingBottom: spacing.lg,
  },
  templeItem: {
    backgroundColor: '#FFFFFF',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    ...shadows.light,
  },
  templeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: spacing.xs,
  },
  templeLocation: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.7,
    marginBottom: spacing.xs,
  },
  templeRating: {
    fontSize: 14,
    color: theme.colors.text,
  },
});

export default TempleSearch;