import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Playlists = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 60,
          marginHorizontal: 10,
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
          Playlists
        </Text>
      </View>

      <View style={{ marginTop: 10, marginLeft: 10 }}>
        <Text style={{ fontSize: 25, marginLeft: 5 }}>Playlists</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{
              width: "85%",
              borderWidth: 0.5,
              paddingHorizontal: 10,
              marginHorizontal: 5,

              marginVertical: 10,
              height: 40,
              borderRadius: 10,
              borderColor: "green",
            }}
            placeholder="Songs, Artist & More"
          />
          <Ionicons name="shuffle" size={30} />
        </View>

        <Text style={{ fontSize: 25 }}>Create a playlist </Text>

        <Pressable
          style={{
            backgroundColor: "lightgreen",
            padding: 10,
            width: 100,
            height: 100,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Ionicons
            name="add-circle"
            size={25}
            style={{ margin: "auto", color: "white" }}
          />
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

export default Playlists;
