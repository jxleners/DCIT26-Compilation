import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

const COLORS = {
  bg: '#EAF4FF',
  primary: '#4682B4',
  dark: '#24527A',
  border: '#A8C7E8',
  danger: '#DC3545',
  muted: '#777777',
  white: '#FFFFFF',
};

export default function App() {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [pendingDelete, setPendingDelete] = useState(null);
  const inputRef = useRef(null);

  const isEditing = editingId !== null;
  const remaining = items.filter((i) => !i.completed).length;

  const resetForm = () => {
    setText('');
    setEditingId(null);
    setError('');
  };

  // Add or save, depending on mode
  const handleSubmit = () => {
    const value = text.trim();
    if (!value) {
      setError('Please enter an item.');
      return;
    }

    if (isEditing) {
      setItems((cur) =>
        cur.map((i) => (i.id === editingId ? { ...i, text: value } : i))
      );
    } else {
      setItems((cur) => [
        ...cur,
        { id: Date.now().toString(), text: value, completed: false },
      ]);
    }
    resetForm();
  };

  const toggleItem = (id) =>
    setItems((cur) =>
      cur.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i))
    );

  const startEdit = (item) => {
    setText(item.text);
    setEditingId(item.id);
    setError('');
    inputRef.current?.focus();
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setItems((cur) => cur.filter((i) => i.id !== pendingDelete.id));
    if (editingId === pendingDelete.id) resetForm();
    setPendingDelete(null);
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.card, editingId === item.id && styles.cardEditing]}>
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxChecked]}
        onPress={() => toggleItem(item.id)}
        hitSlop={8}
      >
        {item.completed && (
          <FontAwesome6 name="check" size={13} color={COLORS.white} />
        )}
      </TouchableOpacity>

      <Text style={styles.index}>{index + 1}.</Text>

      <Text
        style={[styles.itemText, item.completed && styles.itemTextDone]}
        numberOfLines={2}
      >
        {item.text}
      </Text>

      <TouchableOpacity
        style={[styles.iconBtn, styles.editBtn]}
        onPress={() => startEdit(item)}
        hitSlop={6}
      >
        <FontAwesome6 name="pencil" size={16} color={COLORS.dark} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.iconBtn, styles.deleteBtn]}
        onPress={() => setPendingDelete(item)}
        hitSlop={6}
      >
        <FontAwesome6 name="trash-can" size={16} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>To Buy (Merienda)</Text>

        {/* Input row */}
        <View style={styles.inputRow}>
          <TextInput
            ref={inputRef}
            style={[styles.input, !!error && styles.inputError]}
            placeholder="Enter item"
            placeholderTextColor="#8AA4BD"
            value={text}
            onChangeText={(v) => {
              setText(v);
              if (error) setError('');
            }}
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
            blurOnSubmit={false}
          />
          <TouchableOpacity
            style={[styles.btn, styles.primaryBtn]}
            onPress={handleSubmit}
          >
            <Text style={styles.btnText}>{isEditing ? 'SAVE' : 'ADD'}</Text>
          </TouchableOpacity>
          {isEditing && (
            <TouchableOpacity
              style={[styles.btn, styles.cancelBtn]}
              onPress={resetForm}
            >
              <Text style={styles.btnText}>CANCEL</Text>
            </TouchableOpacity>
          )}
        </View>
        {!!error && <Text style={styles.errorText}>{error}</Text>}

        {/* List header */}
        <View style={styles.listHeader}>
          <Text style={styles.subtitle}>My Items</Text>
          {items.length > 0 && (
            <Text style={styles.counter}>{remaining} left</Text>
          )}
        </View>

        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 30 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No items yet. Add your first item!
            </Text>
          }
        />
      </View>

      {/* Delete confirmation (works on web + native, unlike Alert) */}
      <Modal
        transparent
        animationType="fade"
        visible={!!pendingDelete}
        onRequestClose={() => setPendingDelete(null)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Delete Item</Text>
            <Text style={styles.modalBody}>
              Delete "{pendingDelete?.text}"? This can't be undone.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.btn, styles.cancelBtn, styles.modalBtn]}
                onPress={() => setPendingDelete(null)}
              >
                <Text style={styles.btnText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, styles.dangerBtn, styles.modalBtn]}
                onPress={confirmDelete}
              >
                <Text style={styles.btnText}>DELETE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // Full-screen wrapper: centers the app column on wide screens
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
  },
  // App column: fixed max width, never stretches
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: COLORS.dark,
  },

  // Input
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  inputError: { borderColor: COLORS.danger },
  errorText: { color: COLORS.danger, fontSize: 13, marginTop: 6, marginLeft: 4 },

  // Buttons
  btn: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtn: { backgroundColor: COLORS.primary },
  cancelBtn: { backgroundColor: COLORS.muted },
  dangerBtn: { backgroundColor: COLORS.danger },
  btnText: { color: COLORS.white, fontWeight: 'bold', fontSize: 14 },

  // List
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 24,
    marginBottom: 12,
  },
  subtitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.dark },
  counter: { fontSize: 14, color: COLORS.muted },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primary,
    borderWidth: 1,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  cardEditing: { borderColor: COLORS.primary, backgroundColor: '#F5FAFF' },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 6,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: { backgroundColor: COLORS.primary },
  index: { width: 24, color: COLORS.muted, fontSize: 14, fontWeight: '600' },
  itemText: { flex: 1, fontSize: 16, color: '#333' },
  itemTextDone: { textDecorationLine: 'line-through', color: '#999' },

  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  editBtn: { backgroundColor: COLORS.bg },
  deleteBtn: { backgroundColor: '#FDECEC' },

  emptyText: {
    textAlign: 'center',
    color: COLORS.muted,
    fontSize: 15,
    marginTop: 20,
  },

  // Modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modal: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.dark },
  modalBody: { fontSize: 15, color: '#444', marginTop: 8, marginBottom: 20 },
  modalActions: { flexDirection: 'row', gap: 10 },
  modalBtn: { flex: 1 },
});