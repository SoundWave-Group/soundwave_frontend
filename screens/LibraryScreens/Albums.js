import React from "react";
import { View, Text, StyleSheet, StatusBar, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Albums = () => {
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
        <Text
          style={{
            fontSize: 20,
            marginHorizontal: "auto",
          }}
        >
          Albums
        </Text>
      </View>

      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 20 }}>No Albums Yet</Text>
        <Text style={{ fontSize: 16 }}>
          Albums you have created or liked will appear here.
        </Text>

        <Pressable
          style={{
            backgroundColor: "green",
            padding: 10,
            width: 150,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 15, margin: "auto", color: "white" }}>
            Search for Albums
          </Text>
        </Pressable>
      </View>

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

export default Albums;
