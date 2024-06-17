import React from "react";
import { View, Text, StyleSheet, StatusBar, Pressable } from "react-native";
import BottomNavigation from "../../components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Following = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 60,
          marginHorizontal: 25,
        }}
      >
        <View>
          <Pressable onPress={() => navigation.navigate("LibraryScreen")}>
            <Ionicons name="chevron-back" size={25} />
          </Pressable>
        </View>
        <Text style={{ fontSize: 20, marginHorizontal: "auto" }}>
          Following
        </Text>
      </View>

      <BottomNavigation />

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
  },
});

export default Following;
