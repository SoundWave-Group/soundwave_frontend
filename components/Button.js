import { View, Text, StyleSheet, Pressable } from "react-native";

const Button = ({ title, buttonStyle, textStyle, pressed }) => {
  return (
    <View>
      <Pressable style={buttonStyle} onPress={pressed}>
        <Text style={textStyle}> {title}</Text>
      </Pressable>
    </View>
  );
};

module.exports = Button;

const styles = StyleSheet.create({});
