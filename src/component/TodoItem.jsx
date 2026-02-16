import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function TodoItem({ item, onDelete, onEdit, onToggle }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, item.done && styles.done]}>
          {item.title}
        </Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={onToggle} style={{ marginRight: 10}}>
          <Icon name={item.done ? "check-circle" : "circle"} size={22} />
        </Pressable>

        <Pressable onPress={onEdit} style={{ marginRight: 10}}>
          <Icon name="edit-2" size={20} />
        </Pressable>

        <Pressable onPress={onDelete}>
          <Icon name="trash-2" size={20} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: "row",
    elevation: 3
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  desc: {
    color: "#666",
    marginTop: 4
  },
  done: {
    textDecorationLine: "line-through",
    color: "green"
  },
  actions: {
    justifyContent: "space-between",
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
