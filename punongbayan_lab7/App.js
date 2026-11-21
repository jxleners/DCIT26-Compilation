import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const API_URL = 'https://randomuser.me/api';


function Page({ children }) {
  return (
    <View style={styles.screen}>
      <View style={styles.column}>{children}</View>
    </View>
  );
}


function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      const json = await response.json();
      setUser(json.results[0]);
    } catch (e) {
      setError('Could not load a user. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Page>
      <View style={styles.home}>
        {user && (
          <View style={styles.userCard}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Profile', { user })}
            >
              <Image source={{ uri: user.picture.large }} style={styles.avatar} />
            </TouchableOpacity>
            <Text style={styles.name}>
              {user.name.first} {user.name.last}
            </Text>
            <Text style={styles.hint}>Tap the picture to view the profile</Text>
          </View>
        )}

        {loading && !user && <ActivityIndicator size="large" color="#4682B4" />}
        {!!error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={fetchUser}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>RANDOM USER</Text>
          )}
        </TouchableOpacity>
      </View>
    </Page>
  );
}


function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{String(value ?? '-')}</Text>
    </View>
  );
}


function ProfileScreen({ route }) {
  const { user } = route.params;
  const { name, location, dob, registered } = user;

  const address = `${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.country} ${location.postcode}`;

  return (
    <Page>
      <ScrollView contentContainerStyle={styles.profile}>
        <View style={styles.header}>
          <Image source={{ uri: user.picture.large }} style={styles.avatar} />
          <Text style={styles.name}>
            {name.first} {name.last}
          </Text>
        </View>

        <Section title="About">
          <Row label="Age" value={dob.age} />
          <Row label="Birthday" value={new Date(dob.date).toDateString()} />
          <Row label="Gender" value={user.gender} />
          <Row label="Address" value={address} />
        </Section>

        <Section title="Contact">
          <Row label="Email" value={user.email} />
          <Row label="Phone" value={user.phone} />
        </Section>

        <Section title="Other">
          <Row label="Date Registered" value={new Date(registered.date).toDateString()} />
        </Section>
      </ScrollView>
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
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Random User' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#EAF4FF', alignItems: 'center' },
  column: { flex: 1, width: '100%', maxWidth: 480 },


  home: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  userCard: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderTopWidth: 5,
    borderTopColor: '#4682B4',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#D6E6F5',
    borderWidth: 4,
    borderColor: '#4682B4',
  },
  name: { fontSize: 24, fontWeight: 'bold', color: '#24527A', marginTop: 16, textAlign: 'center' },
  hint: { fontSize: 13, color: '#777', marginTop: 6 },
  error: { color: '#DC3545', textAlign: 'center', marginBottom: 16 },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#4682B4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },

  
  profile: { padding: 16, paddingBottom: 32 },
  header: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderTopWidth: 5,
    borderTopColor: '#4682B4',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#24527A',
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#D6E6F5',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  rowLabel: {
  fontSize: 14,
  color: '#000000',
  width: '35%',
},

rowValue: {
  fontSize: 14,
  color: '#000000',
  fontWeight: '600',
  width: '62%',
  textAlign: 'right',
},
});