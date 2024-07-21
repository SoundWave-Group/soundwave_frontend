import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Albums = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <View>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={25} color={"white"} />
          </Pressable>
        </View>
        <Text
          style={{
            fontSize: 20,
            marginHorizontal: "auto",
            color: "white",
          }}
        >
          Albums
        </Text>
      </View>

      <View style={{ marginTop: 20, marginLeft: 10 }}>
        <Text style={{ fontSize: 25, color: "green" }}>No Albums Yet</Text>
        <Text
          style={{ fontSize: 18, marginTop: 10, width: "70%", color: "white" }}
        >
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
          onPress={() => navigation.navigate("SearchTab")}
        >
          <Text style={{ fontSize: 15, margin: "auto", color: "white" }}>
            Search for Albums
          </Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  content: {
    flex: 1,
  },
});

export default Albums;
