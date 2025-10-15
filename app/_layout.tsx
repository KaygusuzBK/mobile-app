import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../hooks/useTheme";


export default function RootLayout() {
  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL as string, {
    unsavedChangesWarning: false,
  });
  return (
    <ThemeProvider>
      <ConvexProvider client={convex}>
      <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name="(tabs)"  /> {/* headerShown: sayfalarda üstteki gezinme çubuğunu gösterir */}
        </Stack>
      </ConvexProvider>
    </ThemeProvider>
  );
}
