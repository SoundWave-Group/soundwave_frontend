// BottomNavigationBar.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./screenStacks/HomeStack";
import SearchStack from "./screenStacks/SearchStack";
import LibraryStack from "./screenStacks/LibraryStack";
import ProfileStack from "./screenStacks/ProfileStack";
import ShazamScreen from "../screens/ShazamScreen";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomNavigationBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
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
        name="SearchScreen"
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
        name="ShazamScreen"
        component={ShazamScreen}
        options={{
          tabBarLabel: "Shazam",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="podcasts" size={24} color="#0A4A3B" />
            ) : (
              <MaterialIcons name="podcasts" size={24} color="#0A4A3B" />
            ),
        }}
      />
      <Tab.Screen
        name="LibraryScreen"
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
        name="ProfileScreen"
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

export default BottomNavigationBar;
