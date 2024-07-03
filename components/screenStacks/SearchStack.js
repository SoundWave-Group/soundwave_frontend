import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../../screens/SearchScreen";
import DownloadScreen from "../../screens/ProfileScreens/DownloadScreen";

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DownloadScreen"
        component={DownloadScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
