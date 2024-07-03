import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";

const ShazamScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.shazamOuterContainer}>
        <View style={styles.shazamInnerContainer}>
          <Pressable onPress={() => Alert.alert("Shazam nigga")}>
            <Ionicons name="musical-notes" size={100} color="lightgreen" />
          </Pressable>
        </View>
      </View>
      <Text style={{ fontSize: 15, marginTop: 20, color: "green" }}>
        Tap the Button Above to Identify A Song
      </Text>
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
  shazamOuterContainer: {
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 200,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  shazamInnerContainer: {
    borderWidth: 2,
    borderColor: "lightgreen",
    borderRadius: 100,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ShazamScreen;
