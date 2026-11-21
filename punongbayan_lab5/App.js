import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function Screen({ title, description, buttonLabel, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <Screen
      title="Home Screen"
      description="This is the Home screen."
      buttonLabel="Go to Profile"
      onPress={() => navigation.navigate('Profile')}
    />
  );
}

function ProfileScreen({ navigation }) {
  return (
    <Screen
      title="Profile Screen"
      description="This is the Profile screen."
      buttonLabel="Back to Home"
      onPress={() => navigation.goBack()}
    />
  );
}

function AboutScreen({ navigation }) {
  return (
    <Screen
      title="About Screen"
      description="This is the About screen."
      buttonLabel="Go to Home"
      onPress={() => navigation.navigate('HomeStack')}
    />
  );
}

const stackHeader = {
  headerStyle: { backgroundColor: '#4682B4' },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: { fontWeight: 'bold' },
};


const drawerButton = (navigation) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{ marginLeft: 14 }}
    >
      <Ionicons name="menu" size={26} color="#FFFFFF" />
    </TouchableOpacity>
  ),
});

// Stack 1: Home + Profile
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={stackHeader}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => drawerButton(navigation)}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

// Stack 2: About (separate stack)
function AboutStack() {
  return (
    <Stack.Navigator screenOptions={stackHeader}>
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={({ navigation }) => drawerButton(navigation)}
      />
    </Stack.Navigator>
  );
}

// Drawer: navigates to the Home and About stacks
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
        }}
      >
        <Drawer.Screen
          name="HomeStack"
          component={HomeStack}
          options={{ drawerLabel: 'Home' }}
        />
        <Drawer.Screen
          name="AboutStack"
          component={AboutStack}
          options={{ drawerLabel: 'About' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF4FF',
    padding: 24,
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#24527A', marginBottom: 8 },
  description: { fontSize: 16, color: '#444', marginBottom: 24 },
  button: {
    backgroundColor: '#4682B4',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});