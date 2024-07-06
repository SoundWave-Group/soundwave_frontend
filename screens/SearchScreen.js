import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import GenreContainer from "../components/GenreContainer";

const browseImages = require.context("../assets/browse", true);
const browseImagesList = browseImages.keys().map(browseImages);

const genreImages = require.context("../assets/genre", true);
const genreImagesList = genreImages.keys().map(genreImages);

const SearchScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("DownloadScreen");
          }}
        >
          <Ionicons name="cloud-download" size={24} color="black" />
        </Pressable>
      </View>
      <TextInput
        style={{
          width: "95%",
          borderWidth: 0.5,
          marginHorizontal: "auto",
          paddingHorizontal: 10,
          margin: 10,
          height: 40,
          borderRadius: 10,
          borderColor: "green",
        }}
        placeholder="Songs, Artist & More"
      />
      <Text style={{ fontSize: 25, margin: 10 }}>Vibes</Text>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginLeft: 5,
          }}
        >
          {browseImagesList.map((image, index) => (
            <GenreContainer key={index} image={image} />
          ))}
          {genreImagesList.map((image, index) => (
            <GenreContainer key={index} image={image} />
          ))}
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default SearchScreen;
