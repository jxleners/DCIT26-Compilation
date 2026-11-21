import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

const COLORS = {
  primary: '#4682B4',
  dark: '#24527A',
  white: '#FFFFFF',
  text: '#333333',
};

const IMAGE_URI = 'https://i.redd.it/n8j7tfjuikm61.jpg';

const PARAGRAPHS = [
  'Meow meow meow meow meow meoooow meowww meeeoOowWw meowww meeeoOowWw meow Meow meow meow meow meoooow meowww meeeoOowWw Meow meow meow meow meoooow meowww meeeoOowWw',
  'kikiam lima fishball lima palamig lima bayad bente sukli lima kung d k bibili umalis kna ehh ohh ice pop lollipop pag na2naw palpak yelo malamig pag na2naw 2big',
  "Get 1GB data with access to ALL sites, valid for 1 day for only 10 Rewards points! It's the best time to be with Globe with exciting rewards available!",
  '—Sagip Last Chat Foundation—',
  "Ang sagip last CHAT foundation ay tumutulong sa mga members upang hindi sila malast chat sa anumang group chat. Ito ay binubuo ng mga miyembrong may bukal sa kalooban na maging isa na p'wedeng maging last chat. Kaya ano pang hinihintay mo sali na! #SagipLastChatFoundation",
  'Meow meow meow meow meow meoooow meowww meeeoOowWw meowww meeeoOowWw meow Meow meow meow meow meoooow meowww meeeoOowWw Meow meow meow meow meoooow meowww meeeoOowWw',
  'kikiam lima fishball lima palamig lima bayad bente sukli lima kung d k bibili umalis kna ehh ohh ice pop lollipop pag na2naw palpak yelo malamig pag na2naw 2big',
  'Meow meow meow meow meoooow meowww meeeoOowWw Meow meow meow meow meoooow meowww meeeoOowWw',
  'Thank you for viewing this sample modal!',
];

export default function SampleModal({ visible, onClose }) {
  const { height } = useWindowDimensions();
  const scrollHeight = Math.max(160, Math.min(height * 0.35, 300));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        {/* Backdrop is a sibling, never a parent of the ScrollView */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={styles.card}>
          <Image
            source={{
              uri: IMAGE_URI,
              headers: {
                'User-Agent':
                  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
              },
            }}
            style={styles.image}
            resizeMode="cover"
            onError={(e) => console.log('Image error:', e.nativeEvent.error)}
          />

          <Text style={styles.title}>Sample Modal</Text>

          <ScrollView
            style={{ height: scrollHeight, flexGrow: 0 }}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator
            nestedScrollEnabled
          >
            {PARAGRAPHS.map((p, i) => (
              <Text key={i} style={styles.text}>
                {p}
              </Text>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.closeText}>CLOSE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    backgroundColor: '#D6E6F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginTop: 12,
    marginBottom: 8,
  },
  scrollContent: { paddingBottom: 12 },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
    marginBottom: 14,
  },
  closeBtn: {
    height: 48,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: { color: COLORS.white, fontWeight: 'bold', fontSize: 14 },
});