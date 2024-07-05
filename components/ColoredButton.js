import { View, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ColoredButton = ({ name, link, color }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate(`${link}`)}
      style={{ marginHorizontal: 2 }}
    >
      <View style={[styles.button, { backgroundColor: `${color}` }]}>
        <Text style={{ fontSize: 15, fontWeight: 600, color: "white" }}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
  },
});
export default ColoredButton;
