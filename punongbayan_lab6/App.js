import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const PRODUCTS = [
  { key: '1', title: 'Xbox', description: "Microsoft's 4K console with a fast 1TB SSD and Game Pass.", rating: 4.5 },
  { key: '2', title: 'PS5', description: "Sony's console with ray-tracing graphics and the DualSense controller.", rating: 4.7 },
  { key: '3', title: 'Nintendo Switch', description: "Nintendo's hybrid console, playable on the TV or handheld.", rating: 4.6 },
];

// Centers the content and stops it from stretching on wide screens
function Page({ children }) {
  return (
    <View style={styles.screen}>
      <View style={styles.column}>{children}</View>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <Page>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Product', { product: item })}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardRating}>★ {item.rating}</Text>
          </TouchableOpacity>
        )}
      />
    </Page>
  );
}

function ProductScreen({ route }) {
  const { product } = route.params;

  return (
    <Page>
      <View style={styles.details}>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>{product.title}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{product.description}</Text>

        <Text style={styles.label}>Rating</Text>
        <Text style={styles.value}>★ {product.rating}</Text>

        <Text style={styles.label}>Key</Text>
        <Text style={styles.value}>{product.key}</Text>
      </View>
    </Page>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#4682B4' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Products' }} />
        <Stack.Screen name="Product" component={ProductScreen} options={{ title: 'Product Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#EAF4FF', alignItems: 'center' },
  column: { flex: 1, width: '100%', maxWidth: 480 },
  list: { padding: 16 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#4682B4',
  },
  cardTitle: { fontSize: 17, fontWeight: '600', color: '#24527A', flex: 1 },
  cardRating: { fontSize: 15, color: '#777', marginLeft: 12 },
  details: {
    margin: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  label: { fontSize: 13, color: '#777', marginTop: 12 },
  value: { fontSize: 18, color: '#24527A', fontWeight: '600' },
});