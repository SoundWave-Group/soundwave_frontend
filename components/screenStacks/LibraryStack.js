// LibraryStack.js
import { createStackNavigator } from "@react-navigation/stack";
import LibraryScreen from "../../screens/LibraryScreen";
import LikedTracks from "../../screens/LibraryScreens/LikedTracks";
import Albums from "../../screens/LibraryScreens/Albums";
import Following from "../../screens/LibraryScreens/Following";
import Stream from "../../screens/LibraryScreens/Stream";
import Playlists from "../../screens/LibraryScreens/Playlists";
import Uploads from "../../screens/LibraryScreens/Uploads";

const Stack = createStackNavigator();

const LibraryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LibraryScreen"
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
};

export default LibraryStack;
