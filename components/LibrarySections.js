import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";

const LibrarySections = ({ name, link, icon }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(`${link}`)}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderStyle: "solid",
          backgroundColor: "#101010",
          padding: 10,
          margin: 2,
          borderRadius: 10,
        }}
      >
        <MaterialCommunityIcons
          name={`${icon}`}
          color={"white"}
          size={24}
          style={{
            borderColor: "grey",
            padding: 10,
            borderRadius: 10,
            marginRight: 20,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                marginVertical: 10,
                fontWeight: "500",
                color: "white",
              }}
            >
              {name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LibrarySections;
