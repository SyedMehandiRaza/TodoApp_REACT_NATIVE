import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'TODOS_DATA';

export const loadTodos = async () => {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTodos = async (todos) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(todos));
};
