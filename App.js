import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Splash from "./screens/Splash";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import LibraryScreen from "./screens/LibraryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SignUp from "./screens/SignUpScreen";

// Library Screen
import LikedTracks from "./screens/LibraryScreens/LikedTracks";
import Albums from "./screens/LibraryScreens/Albums";
import Following from "./screens/LibraryScreens/Following";
import Stream from "./screens/LibraryScreens/Stream";
import Playlists from "./screens/LibraryScreens/Playlists";
import Uploads from "./screens/LibraryScreens/Uploads";
import Trending from "./screens/HomeScreens/Trending";
import NewMusic from "./screens/HomeScreens/NewMusic";
import Settings from "./screens/ProfileScreens/Settings";
import Inbox from "./screens/ProfileScreens/Inbox";
import Notifications from "./screens/ProfileScreens/Notifications";
import Advertising from "./screens/ProfileScreens/Advertising";
import Legal from "./screens/ProfileScreens/Legal";
import Account from "./screens/ProfileScreens/Account";
import Storage from "./screens/ProfileScreens/Storage";
import Analytics from "./screens/ProfileScreens/Analytics";

import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomNavigationBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={24} color="#0A4A3B" />
            ) : (
              <Ionicons name="home-outline" size={24} color="#0A4A3B" />
            ),
        }}
      />

      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="search" size={24} color="#0A4A3B" />
            ) : (
              <Ionicons name="search-outline" size={24} color="#0A4A3B" />
            ),
        }}
      />

      <Tab.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{
          tabBarLabel: "Library",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons
                name="my-library-music"
                size={24}
                color="#0A4A3B"
              />
            ) : (
              <MaterialCommunityIcons
                name="music-box-multiple-outline"
                size={24}
                color="#0A4A3B"
              />
            ),
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="user-circle-o" size={24} color="#0A4A3B" />
            ) : (
              <FontAwesome5 name="user-circle" size={24} color="#0A4A3B" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainScreen"
          component={BottomNavigationBar}
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
        <Stack.Screen
          name="LikedTracks"
          component={LikedTracks}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Albums"
          component={Albums}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Following"
          component={Following}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Stream"
          component={Stream}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Playlists"
          component={Playlists}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Uploads"
          component={Uploads}
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
          name="Legal"
          component={Legal}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Advertising"
          component={Advertising}
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
    </NavigationContainer>
  );
}
