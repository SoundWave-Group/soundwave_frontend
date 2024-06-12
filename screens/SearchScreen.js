import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import BottomNavigation from "../components/BottomNavigation";

const SearchScreen = () => {
  return (
    <View>
      <View>
        <Text>SearchScreen</Text>
      </View>
      <BottomNavigation />
      <StatusBar style="auto" />
    </View>
  );
};

export default SearchScreen;
