import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import GenreBox from "../components/GenreBox";
import { ScrollView } from "react-native-gesture-handler";

const SearchScreen = () => {
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 50,
          paddingHorizontal: 30,
        }}
      >
        <Pressable
          onPress={() => {
            navigator.navigate("HomeScreen");
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={() => {
            navigator.navigate("DownloadScreen");
          }}
        >
          <Ionicons name="cloud-download" size={24} color="black" />
        </Pressable>
      </View>
      <TextInput
        style={{
          width: "90%",
          borderWidth: 0.5,
          marginHorizontal: "auto",
          paddingHorizontal: 20,
          margin: 10,
          height: 40,
          borderRadius: 20,
        }}
        placeholder="Songs, Artist & More"
      />
      <Text style={{ fontSize: 20, margin: 10 }}>Vibes</Text>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <GenreBox name="Hip Hop" />
          <GenreBox name="Pop" color="yellow" />
          <GenreBox name="Rock" color="grey" />
          <GenreBox name="Jazz" color="lightblue" />
          <GenreBox name="Bollywood" color="pink" />
          <GenreBox name="Pop Fusion" color="lightgreen" />
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default SearchScreen;
