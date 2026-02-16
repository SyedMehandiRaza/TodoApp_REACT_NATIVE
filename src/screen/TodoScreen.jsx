import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Pressable, Text } from 'react-native';

import TodoItem from '../component/TodoItem';
import TodoModal from '../component/TodoModal';
import { loadTodos, saveTodos } from '../storage/todoStorage.js';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TodoScreen() {
  const [todos, setTodos] = useState([]);
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const data = await loadTodos();
    setTodos(data);
  };

  const handleSave = async (title, desc) => {
    if (!title) return;

    let updated;

    if (editItem) {
      updated = todos.map(t =>
        t.id === editItem.id ? { ...t, title, desc } : t
      );
    } else {
      updated = [
        { id: Date.now().toString(), title, desc, done: false },
        ...todos
      ];
    }

    setTodos(updated);
    saveTodos(updated);
    setEditItem(null);
    setModal(false);
  };

  const deleteTodo = (id) => {
    const list = todos.filter(t => t.id !== id);
    setTodos(list);
    saveTodos(list);
  };

  const toggleTodo = (id) => {
    const list = todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTodos(list);
    saveTodos(list);
  };

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={todos}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onDelete={() => deleteTodo(item.id)}
            onEdit={() => { setEditItem(item); setModal(true); }}
            onToggle={() => toggleTodo(item.id)}
          />
        )}
      />

      <Pressable
        style={styles.fab}
        onPress={() => setModal(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>

      <TodoModal
        visible={modal}
        onClose={() => { setModal(false); setEditItem(null); }}
        onSave={handleSave}
        editItem={editItem}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f3f4f8",
    backgroundColor: "#a3a3ff",
    padding: 16
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#7c7cff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
  },
  fabText: {
    fontSize: 28,
    color: "#fff"
  }
});
