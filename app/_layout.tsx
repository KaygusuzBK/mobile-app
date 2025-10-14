import { Stack } from "expo-router";
import { ThemeProvider } from "../hooks/useTheme";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(tabs)"  /> {/* headerShown: sayfalarda üstteki gezinme çubuğunu gösterir */}
      </Stack>
    </ThemeProvider>
  );
}
