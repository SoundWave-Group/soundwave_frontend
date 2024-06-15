import { View, Text } from "react-native";
import React from "react";

const placeholderImage = require("../assets/adaptive-icon.png");

const GenreBox = ({ name, image = placeholderImage, color = "red" }) => {
  return (
    <View
      style={{
        backgroundColor: color,
        width: "45%",
        height: 150,
        marginHorizontal: "auto",
        margin: 10,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 20, padding: 10 }}>{name}</Text>
    </View>
  );
};

export default GenreBox;
