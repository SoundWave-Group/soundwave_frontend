import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import BottomNavigation from "../components/BottomNavigation";

const LibraryScreen = () => {
  return (
    <View>
      <Text>LibraryScreen</Text>

      <BottomNavigation />
      <StatusBar style="auto" />
    </View>
  );
};

export default LibraryScreen;
