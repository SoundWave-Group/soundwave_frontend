import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";

const LibrarySections = ({ name, link }) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate(`${link}`)}>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 25, marginVertical: 10, fontWeight: "500" }}>
            {name}
          </Text>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
      </View>
    </Pressable>
  );
};

export default LibrarySections;
