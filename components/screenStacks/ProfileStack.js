import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../../screens/ProfileScreen";
import Settings from "../../screens/ProfileScreens/Settings";
import Inbox from "../../screens/ProfileScreens/Inbox";
import Notifications from "../../screens/ProfileScreens/Notifications";
import Advertising from "../../screens/ProfileScreens/Advertising";
import Legal from "../../screens/ProfileScreens/Legal";
import Account from "../../screens/ProfileScreens/Account";
import Storage from "../../screens/ProfileScreens/Storage";
import Analytics from "../../screens/ProfileScreens/Analytics";

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Inbox"
        component={Inbox}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Advertising"
        component={Advertising}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Legal"
        component={Legal}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Storage"
        component={Storage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Analytics"
        component={Analytics}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
