
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Profile</Text>

      <Text style={[styles.text, {fontWeight: 'bold'}]}>Name: </Text>
      <Text style={styles.text}>Jelene Punongbayan</Text>
      <Text style={[styles.text, {fontWeight: 'bold'}]}>Age: </Text>
      <Text style={styles.text}>21</Text>
      <Text style={[styles.text, {fontWeight: 'bold'}]}>Course/Year/Section: </Text>
      <Text style={styles.text}>BS Computer Science, 3rd Year, Section 2</Text>
      <Text style={[styles.text, {fontWeight: 'bold'}]}>About Me: </Text>
      <Text style={styles.text}>A responsible student who aims to succeed in life. Right now, I am still exploring and figuring things out.</Text>
      <Text style={[styles.text, {fontWeight: 'bold'}]}>Achievements: </Text>
      <Text style={styles.text}>- Consistent Academic Awardee (2018-2024)</Text>
      <Text style={styles.text}>- Academic Achiever (2024-2025)</Text>
      <Text style={[styles.text, {fontWeight: 'bold'}]}>Skills: </Text>
      <Text style={styles.text}>- Problem-Solver</Text>
      <Text style={styles.text}>- Multitasker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
  },
});
