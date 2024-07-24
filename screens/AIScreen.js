import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import React from "react";

const AIScreen = () => {
  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <Text style={{ color: "white" }}>AIScreen</Text>
    </SafeAreaView>
  );
};

export default AIScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignContent: "center",
    justifyContent: "center",
  },
});
