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
            marginHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 25, marginVertical: 10, color: "green" }}>
            {name}
          </Text>
          <Ionicons
            name="arrow-forward-circle-outline"
            size={24}
            color="black"
          />
        </View>
      </View>
    </Pressable>
  );
};

export default LibrarySections;
