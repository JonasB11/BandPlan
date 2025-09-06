import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card } from '../ui/Card';
import { ThemedText } from '../ThemedText';
import { IconSymbol } from '../ui/IconSymbol';
import { Member } from '../../types';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

interface MemberCardProps {
  member: Member;
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
}

export function MemberCard({ member, onEdit, onDelete }: MemberCardProps) {
  const colorScheme = useColorScheme();

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <IconSymbol
            name="person.circle.fill"
            size={40}
            color={Colors[colorScheme].primary}
          />
        </View>
        <View style={styles.infoContainer}>
          <ThemedText style={styles.name}>{member.name}</ThemedText>
          <ThemedText style={styles.instrument}>{member.instrument}</ThemedText>
          {member.phone && (
            <ThemedText style={styles.contact}>{member.phone}</ThemedText>
          )}
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(member)} style={styles.actionButton}>
            <IconSymbol
              name="pencil"
              size={20}
              color={Colors[colorScheme].primary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(member.id)} style={styles.actionButton}>
            <IconSymbol
              name="trash"
              size={20}
              color={Colors[colorScheme].error}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  instrument: {
    fontSize: 14,
    opacity: 0.8,
  },
  contact: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.6,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
});
