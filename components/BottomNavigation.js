import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BottomNavigation = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        top: "auto",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 80,
        marginBottom: "auto",
        backgroundColor: "lightgreen",
        paddingLeft: 10,
        marginTop: "auto",
      }}
    >
      <View style={styles.navBar}>
        <Pressable onPress={() => navigation.navigate("HomeScreen")}>
          <Ionicons name="home" size={24} color="white" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("SearchScreen")}>
          <Ionicons name="search" size={24} color="white" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("LibraryScreen")}>
          <Ionicons name="library" size={24} color="white" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("ProfileScreen")}>
          <Ionicons name="person" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = {
  navBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  navBarText: {
    color: "white",
    fontSize: 20,
  },
};

export default BottomNavigation;
