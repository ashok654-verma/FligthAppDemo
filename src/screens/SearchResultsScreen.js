import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { fetchFlights } from '../services/api';

export default function SearchResultsScreen({ route }) {
  const { origin, destination, dateFrom, dateTo } = route.params;
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFlights = async () => {
      const results = await fetchFlights({ origin, destination, dateFrom, dateTo });
      setFlights(results);
      setLoading(false);
    };
    loadFlights();
  }, [origin, destination, dateFrom, dateTo]);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const getDuration = (start, end) => {
    const diff = new Date(end) - new Date(start);
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={60} color="#3366FF" />
      </View>
    );
  }

  if (!flights.length) {
    return (
      <View style={styles.noResults}>
        <Text style={styles.noResultText}>No flights found 🚫</Text>
        <Text style={styles.noResultSub}>Try different dates or cities.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={flights}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={{ paddingBottom: 30 }}
      renderItem={({ item }) => (
        <View style={styles.flightCard}>
          <Text style={styles.route}>{item.cityFrom} → {item.cityTo}</Text>
          <Text style={styles.price}>💶 {item.price}</Text>
          <Text style={styles.time}>⏰ {formatTime(item.local_departure)} → {formatTime(item.local_arrival)} ({getDuration(item.local_departure, item.local_arrival)})</Text>
          <Text style={styles.airline}>✈️ {item.airlines?.join(', ')}</Text>
          <Text style={styles.airline}>Distance: {item.distance?.toFixed(1)} km</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  flightCard: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fefefe',
    elevation: 2,
  },
  route: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#2e7d32',
    marginTop: 4,
  },
  time: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  airline: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  noResults: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noResultImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    tintColor: '#999',
  },
  noResultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  noResultSub: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});
