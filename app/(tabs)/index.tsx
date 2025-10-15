import { TodoInput } from "@/components/TodoInput";
import { TodoList } from "@/components/TodoList";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createHomeStyles } from "../../assets/images/styles/home.styles";
import Header from "../../components/Header";
import useTheme from "../../hooks/useTheme";

export default function Index() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const addTodo = useMutation(api.todos.addTodo);

  const handleAddTodo = (text: string) => {
    addTodo({ text });
  };

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <SafeAreaView style={homeStyles.safeArea}>
        <StatusBar barStyle={colors.statusBarStyle} />
        <Header />
        <TodoInput onAddTodo={handleAddTodo} />
        <TodoList />
      </SafeAreaView>
    </LinearGradient>
  );
}
