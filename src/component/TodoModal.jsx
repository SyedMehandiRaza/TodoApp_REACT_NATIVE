import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable
} from 'react-native';

export default function TodoModal({ visible, onClose, onSave, editItem }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
      setDesc(editItem.desc);
    } else {
      setTitle('');
      setDesc('');
    }
  }, [editItem]);

  function handleSave(){
    onSave(title, desc);
    setDesc('');
    setTitle('');
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.box}>

          <Text style={styles.header}>
            {editItem ? "Edit Task" : "Add Task"}
          </Text>

          <TextInput
            placeholder="Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            placeholder="Description"
            style={styles.input}
            value={desc}
            onChangeText={setDesc}
          />

          <Pressable
            style={styles.btn}
            // onPress={() => onSave(title, desc)}
            onPress={() => {handleSave()}}
          >
            <Text style={styles.btnText}>SAVE</Text>
          </Pressable>

          <Pressable onPress={onClose}>
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              Cancel
            </Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#0006",
    justifyContent: "center",
    padding: 20
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 16
  },
  btn: {
    backgroundColor: "#7c7cff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center"
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});
