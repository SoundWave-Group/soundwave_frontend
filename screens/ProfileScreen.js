import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import BottomNavigation from "../components/BottomNavigation";

const ProfileScreen = () => {
  return (
    <View>
      <Text>ProfileScreen</Text>

      <BottomNavigation />

      <StatusBar style="auto" />
    </View>
  );
};

export default ProfileScreen;
