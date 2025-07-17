import React, { useState, useContext } from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const { logout } = useContext(AuthContext);

  const handleSearch = () => {
    if (!origin || !destination || !dateFrom || !dateTo) return;
    navigation.navigate('Results', { origin, destination, dateFrom, dateTo });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar with Title and Logout */}
      <View style={styles.header}>
        <Text style={styles.title}>Flight Finder ✈️</Text>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Search Inputs */}
      <TextInput
        style={styles.input}
        placeholder="From (e.g. BER)"
        value={origin}
        onChangeText={setOrigin}
        autoCapitalize="characters"
      />
      <TextInput
        style={styles.input}
        placeholder="To (e.g. SAW)"
        value={destination}
        onChangeText={setDestination}
        autoCapitalize="characters"
      />
      <TextInput
        style={styles.input}
        placeholder="Start Date (e.g. 03/07/2025)"
        value={dateFrom}
        onChangeText={setDateFrom}
      />
      <TextInput
        style={styles.input}
        placeholder="End Date (e.g. 30/09/2025)"
        value={dateTo}
        onChangeText={setDateTo}
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>🔍 Search Flights</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F7F9FC',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E3A59',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D6E0',
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3366FF',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '600',
  },
});
