import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useTheme from "../../hooks/useTheme";

export default function Index() {
  const { colors } = useTheme();

  const todos = useQuery(api.todos.getTodos);
  console.log(todos);

const addTodo = useMutation(api.todos.addTodo);
const clearAllTodos = useMutation(api.todos.clearAllTodos);
  
  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={[styles.content, { color: colors.text }]}>Hello, This is the main screen</Text>
      <TouchableOpacity onPress={() => addTodo({ text: "New Todo" })}>
        <Text style={{ color: colors.text }}>Add Todo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clearAllTodos()}>
        <Text style={{ color: colors.text }}>Clear All Todos</Text>
      </TouchableOpacity>
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
