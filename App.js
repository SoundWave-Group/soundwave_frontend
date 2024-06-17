import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
import Uploads from "./screens/LibraryScreens/Your Uploads";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LibraryScreen"
          component={LibraryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
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
    </NavigationContainer>
  );
}
