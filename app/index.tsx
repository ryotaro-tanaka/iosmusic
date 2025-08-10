import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { m4aSongs } from "../generated/m4aSongs";

// const songs = [
//   { id: "1", title: "Song A" },
//   { id: "2", title: "Song B" },
//   { id: "3", title: "Song C" },
// ];

// export const sampleSongs = [
//   { id: "1", title: "Sample Song A", file: require("../assets/songs/_sampleRXUFOnjM16U.m4a") },
//   { id: "2", title: "Sample Song B", file: require("../assets/songs/_sampleXoFBtJ3W0es.m4a") },
// ];

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <FlatList
        data={m4aSongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderColor: "#ccc",
            }}
            onPress={() =>
              router.push({
                pathname: "./player",
                params: { id: item.id, title: item.title, file: item.file },
              })
            }
          >
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
