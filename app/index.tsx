import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const songs = [
  { id: "1", title: "Song A" },
  { id: "2", title: "Song B" },
  { id: "3", title: "Song C" },
];

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <FlatList
        data={songs}
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
                params: { id: item.id, title: item.title },
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
