import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef } from "react";
import { Button, Text, View } from "react-native";

export default function Player() {
  const { id, title, file } = useLocalSearchParams();
  const router = useRouter();
  const sound = useRef<Audio.Sound | null>(null);

  const playSound = async () => {
    if (file) {
      // if (sound.current) {
      //   await sound.current.unloadAsync();
      // }
      const { sound: newSound } = await Audio.Sound.createAsync(
        typeof file === "string" ? { uri: file } : file
      );
      sound.current = newSound;
      await newSound.playAsync();
    }
  };

  const stopSound = async () => {
    if (sound.current) {
      await sound.current.stopAsync();
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{title ?? "no title"}</Text>
      <Text style={{ marginVertical: 16 }}>ID: {id}</Text>
      <Button title="play" onPress={playSound} />
      <Button title="stop" onPress={stopSound} />
      <Button title="back" onPress={() => router.back()} />
    </View>
  );
}