import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TransitionPresets } from "@react-navigation/stack";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

import Splash from "./screens/Splash";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";
import NewMusic from "./screens/HomeScreens/NewMusic";
import Trending from "./screens/HomeScreens/Trending";
import LibraryScreen from "./screens/LibraryScreen";
import LikedTracks from "./screens/LibraryScreens/LikedTracks";
import Albums from "./screens/LibraryScreens/Albums";
import Following from "./screens/LibraryScreens/Following";
import Stream from "./screens/LibraryScreens/Stream";
import Playlists from "./screens/LibraryScreens/Playlists";
import Uploads from "./screens/LibraryScreens/Uploads";
import ProfileScreen from "./screens/ProfileScreen";
import Settings from "./screens/ProfileScreens/Settings";
import Inbox from "./screens/ProfileScreens/Inbox";
import Notifications from "./screens/ProfileScreens/Notifications";
import Advertising from "./screens/ProfileScreens/Advertising";
import Legal from "./screens/ProfileScreens/Legal";
import Account from "./screens/ProfileScreens/Account";
import Storage from "./screens/ProfileScreens/Storage";
import Analytics from "./screens/ProfileScreens/Analytics";
import SearchScreen from "./screens/SearchScreen";
import DownloadScreen from "./screens/ProfileScreens/DownloadScreen";
import PlayerScreen from "./screens/PlayerScreen";
import ShazamScreen from "./screens/ShazamScreen";
import SongListScreen from "./screens/SongListScreen";
import VideoScreen from "./screens/VideoScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false, animationEnabled: false }}
    />
    <Stack.Screen
      name="NewMusic"
      component={NewMusic}
      options={{ headerShown: false, animationEnabled: false }}
    />
    <Stack.Screen
      name="Trending"
      component={Trending}
      options={{ headerShown: false, animationEnabled: false }}
    />
  </Stack.Navigator>
);

const LibraryStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Library"
      component={LibraryScreen}
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
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
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

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Download"
      component={DownloadScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const BottomNavigationBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "black", borderTopWidth: 0 },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
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
        name="SearchTab"
        component={SearchStack}
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
        name="VideoTab"
        component={VideoScreen}
        options={{
          tabBarLabel: "Video",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="video" size={24} color="#0A4A3B" />
            ) : (
              <MaterialCommunityIcons
                name="video-outline"
                size={24}
                color="#0A4A3B"
              />
            ),
        }}
      />
      <Tab.Screen
        name="LibraryTab"
        component={LibraryStack}
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
        name="ProfileTab"
        component={ProfileStack}
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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userDetails = await AsyncStorage.getItem("userDetails");
        if (userDetails) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "MainScreen" : "SplashScreen"}
      >
        <Stack.Screen
          name="SplashScreen"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainScreen"
          component={BottomNavigationBar}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PlayerScreen"
          component={PlayerScreen}
          options={{
            headerShown: false,
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
        <Stack.Screen
          name="ShazamScreen"
          component={ShazamScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SongListScreen"
          component={SongListScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
