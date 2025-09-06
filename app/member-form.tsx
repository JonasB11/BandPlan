import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { Member } from '../types';

export default function MemberFormScreen() {
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isEditing = !!params.id;

  const [name, setName] = useState(params.name as string || '');
  const [instrument, setInstrument] = useState(params.instrument as string || '');
  const [phone, setPhone] = useState(params.phone as string || '');
  const [email, setEmail] = useState(params.email as string || '');

  const handleSave = async () => {
    if (!name || !instrument) return;

    const member: Member = {
      id: params.id as string || Date.now().toString(),
      name,
      instrument,
      phone,
      email,
    };

    if (isEditing) {
      await storage.updateItem(STORAGE_KEYS.MEMBERS, member.id, member);
    } else {
      await storage.addItem(STORAGE_KEYS.MEMBERS, member);
    }

    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        <View style={styles.header}>
          <ThemedText style={styles.title}>
            {isEditing ? 'Mitglied bearbeiten' : 'Neues Mitglied'}
          </ThemedText>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Name *</ThemedText>
            <TextInput
              style={[styles.input, {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].border,
              }]}
              value={name}
              onChangeText={setName}
              placeholder="Name eingeben"
              placeholderTextColor={Colors[colorScheme].tabIconDefault}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Instrument *</ThemedText>
            <TextInput
              style={[styles.input, {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].border,
              }]}
              value={instrument}
              onChangeText={setInstrument}
              placeholder="Instrument eingeben"
              placeholderTextColor={Colors[colorScheme].tabIconDefault}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Telefon</ThemedText>
            <TextInput
              style={[styles.input, {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].border,
              }]}
              value={phone}
              onChangeText={setPhone}
              placeholder="Telefonnummer eingeben"
              placeholderTextColor={Colors[colorScheme].tabIconDefault}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>E-Mail</ThemedText>
            <TextInput
              style={[styles.input, {
                color: Colors[colorScheme].text,
                borderColor: Colors[colorScheme].border,
              }]}
              value={email}
              onChangeText={setEmail}
              placeholder="E-Mail eingeben"
              placeholderTextColor={Colors[colorScheme].tabIconDefault}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: Colors[colorScheme].primary }]}
            onPress={handleSave}
          >
            <ThemedText style={styles.saveButtonText}>Speichern</ThemedText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  saveButton: {
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
