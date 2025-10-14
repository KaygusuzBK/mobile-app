import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
    },
    content: {
    fontSize: 20,
    fontWeight: 'bold',
  },  
});

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.content}>Hello, This is the main screen</Text>
    </View>
  );
}
