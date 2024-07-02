import { View, Text, StyleSheet } from "react-native";

const ShazamScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ShazamScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default ShazamScreen;
