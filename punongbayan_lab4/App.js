
import React, { useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
} from 'react-native';

import SampleModal from './components/AssetExample';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Button
        title="CLICK ME"
        onPress={() => setModalVisible(true)}
      />

      <SampleModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF4FF',
  },
});
