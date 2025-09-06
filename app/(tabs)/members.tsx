import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { MemberCard } from '../../components/members/MemberCard';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { storage, STORAGE_KEYS } from '../../utils/storage';
import { Member } from '../../types';
import { router } from 'expo-router';

export default function MembersScreen() {
  const [members, setMembers] = useState<Member[]>([]);
  const colorScheme = useColorScheme();

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    const loadedMembers = await storage.getItems(STORAGE_KEYS.MEMBERS);
    setMembers(loadedMembers);
  };

  const handleAddMember = () => {
    router.push('/member-form');
  };

  const handleEditMember = (member: Member) => {
    router.push({
      pathname: '/member-form',
      params: member
    });
  };

  const handleDeleteMember = async (id: string) => {
    await storage.deleteItem(STORAGE_KEYS.MEMBERS, id);
    loadMembers();
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Bandmitglieder</ThemedText>
        <TouchableOpacity
          onPress={handleAddMember}
          style={[styles.addButton, { backgroundColor: Colors[colorScheme].primary }]}
        >
          <IconSymbol name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MemberCard
            member={item}
            onEdit={handleEditMember}
            onDelete={handleDeleteMember}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
              Noch keine Bandmitglieder hinzugefügt
            </ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
  },
});
