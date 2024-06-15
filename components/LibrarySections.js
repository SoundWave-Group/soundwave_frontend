import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

const LibrarySections = ({ name }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 20, marginVertical: 10 }}>{name}</Text>
        <Ionicons name="arrow-forward-circle-outline" size={24} color="black" />
      </View>
    </View>
  );
};

export default LibrarySections;
