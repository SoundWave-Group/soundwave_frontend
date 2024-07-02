import { View, Text } from "react-native";
import React from "react";

const placeholderImage = require("../assets/adaptive-icon.png");

const GenreContainer = ({ name, image = placeholderImage, color = "red" }) => {
  return (
    <View
      style={{
        backgroundColor: color,
        width: 180,
        height: 150,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 20, padding: 10 }}>{name}</Text>
    </View>
  );
};

export default GenreContainer;
