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
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginTop: 40,
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
          Uploads
        </Text>
      </View>

      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 25, color: "white" }}>No Uploads Yet</Text>
        <Text style={{ fontSize: 20, marginTop: 10, color: "white" }}>
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

      <StatusBar style="light" />
    </View>
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

export default Uploads;
