import { StyleSheet, Text, View } from "react-native";
import useTheme from "../../hooks/useTheme";

export default function Index() {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.content, { color: colors.text }]}>Hello, This is the main screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    fontSize: 20,
    fontWeight: 'bold',
  },  
});
