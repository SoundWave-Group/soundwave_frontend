import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";

const ColoredButton = ({ name, color = "green" }) => {
  return (
    <View style={[styles.button, { backgroundColor: `${color}` }]}>
      <Text style={{ fontSize: 15, fontWeight: 600, color: "white" }}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 50,
    width: 100,
    alignItems: "center",
    marginRight: 5,
  },
});
export default ColoredButton;
