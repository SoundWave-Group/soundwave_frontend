// HomeStack.js
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import NewMusic from "../../screens/HomeScreens/NewMusic";
import Trending from "../../screens/HomeScreens/Trending";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewMusic"
        component={NewMusic}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Trending"
        component={Trending}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
