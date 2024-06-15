import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BottomNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomNavBar}>
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

const styles = StyleSheet.create({
  bottomNavBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "lightgreen",
    height: 80,
  },
  navBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "start",
    paddingVertical: 20,
    justifyContent: "space-around",
    padding: 10,
  },
});

export default BottomNavigation;
