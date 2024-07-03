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

const Uploads = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
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
        <Text style={{ fontSize: 25 }}>No Uploads Yet</Text>
        <Text style={{ fontSize: 20, marginTop: 10 }}>
          Your Uploads will appear here.
        </Text>

        <Pressable
          style={{
            backgroundColor: "green",
            padding: 10,
            width: 150,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 15, margin: "auto", color: "white" }}>
            Upload a Track
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
    backgroundColor: "white",
  },
  content: {
    flex: 1,
  },
});

export default Uploads;