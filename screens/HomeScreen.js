import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";

import GenreContainer from "../components/GenreContainer";
import HomeNavigation from "../components/HomeNavigation";
import GenreBox from "../components/GenreBox";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeNavigation activeRouteName="MainScreen" />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.headerStyle}>Your Top Genres</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 5 }}
          >
            <GenreBox name="Hip Hop" />
            <GenreBox name="Pop" color="yellow" />
            <GenreBox name="Rock" color="grey" />
            <GenreBox name="Jazz" color="lightblue" />
            <GenreBox name="Bollywood" color="pink" />
          </ScrollView>
        </View>

        <Text style={[styles.headerStyle, { marginTop: 40 }]}>Browse More</Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginLeft: 5,
            marginTop: 10,
          }}
        >
          <GenreContainer name="Pop Fusion" color="lightgreen" />
          <GenreContainer name="Classical" color="lightgrey" />
          <GenreContainer name="Country" color="brown" />
          <GenreContainer name="Indie" color="purple" />
          <GenreContainer name="Reggae" color="orange" />
          <GenreContainer name="Rap" color="lightgreen" />
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    marginTop: 30,
  },
  headerStyle: {
    fontSize: 25,
    color: "green",
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
