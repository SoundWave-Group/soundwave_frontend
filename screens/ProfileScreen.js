import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import BottomNavigation from "../components/BottomNavigation";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>

      <BottomNavigation />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default ProfileScreen;
