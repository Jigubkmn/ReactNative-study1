import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* headerShown: falseにすることでタブ内の角ページのヘッダーを非表示 */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      <Stack.Screen name="+not-found"/>
    </Stack>
  )
}
