import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Player() {
  const { id, title } = useLocalSearchParams();
  const router = useRouter();

  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <View>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{title ?? "no title"}</Text>
      <Text style={{ marginVertical: 16 }}>ID: {id}</Text>
      <Button title="play" onPress={() => { /* playing code */ }} />
      <Button title="stop" onPress={() => { /* stopping code */ }} />
      <Button title="back" onPress={() => router.back()} />
    </View>
  );
}