import { StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function App() {

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "red", padding: 60}}>
      <Text style={{ color: "white", fontSize: 24}}> To-do App</Text>
    </SafeAreaView>
  );
}