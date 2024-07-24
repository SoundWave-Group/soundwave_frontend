import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import data from "../utils/data";
import VibesContainer from "../components/VibesContainer";

const ArtisteComponent = ({ name, icon }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "#101010",
        padding: 10,
        margin: 2,
        borderRadius: 10,
      }}
    >
      <MaterialCommunityIcons
        name={`${icon}`}
        color={"white"}
        size={24}
        style={{
          borderColor: "grey",
          padding: 10,
          borderRadius: 10,
          marginRight: 20,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              marginVertical: 10,
              fontWeight: "500",
              color: "white",
            }}
          >
            {name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const SearchScreen = () => {
  const navigation = useNavigation();

  const [searchItem, setSearchItem] = useState("");
  const [search, setSearch] = useState(false);

  const handleSearch = (text) => {
    setSearchItem(text);
    setSearch(text.length > 0);
  };

  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
          marginTop: 5,
        }}
      >
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <TextInput
          style={{
            width: "80%",
            borderWidth: 0.5,
            marginHorizontal: "auto",
            paddingHorizontal: 10,
            height: 40,
            borderRadius: 10,
            borderColor: "green",
            color: "green",
          }}
          placeholderTextColor={"green"}
          onChangeText={handleSearch}
          value={searchItem}
          placeholder="Songs, Artist & More"
        />
        <Pressable
          onPress={() => {
            navigation.navigate("AIScreen");
          }}
        >
          <Ionicons name="balloon" size={24} color="white" />
        </Pressable>
      </View>

      {search ? (
        <ScrollView>
          <View style={styles.gridContainer}>
            {data[6].vibes
              .filter((vibes) =>
                vibes.name.toLowerCase().includes(searchItem.toLowerCase())
              )
              .map((vibes, index) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    navigation.navigate("SongListScreen", {
                      genre: vibes.name,
                      songs: vibes.songs,
                    })
                  }
                  style={styles.genrePressable}
                >
                  <VibesContainer image={vibes.photo} text={vibes.name} />
                </Pressable>
              ))}
          </View>
          <View>
            {data[0].artistes
              .filter((artiste) =>
                artiste.name.toLowerCase().includes(searchItem.toLowerCase())
              )
              .map((artiste, index) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    navigation.navigate("SongListScreen", {
                      genre: artiste.name,
                      songs: artiste.songs,
                    })
                  }
                  style={{ margin: 3 }}
                >
                  <ArtisteComponent name={artiste.name} icon={"music"} />
                </Pressable>
              ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
          <Text style={{ fontSize: 25, margin: 10 }}>Vibes</Text>

          <View style={styles.gridContainer}>
            {data[6].vibes.map((vibes, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate("SongListScreen", {
                    genre: vibes.name,
                    songs: vibes.songs,
                  })
                }
                style={styles.genrePressable}
              >
                <VibesContainer image={vibes.photo} text={vibes.name} />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },

  container: {
    backgroundColor: "black",
    flex: 1,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 10,
  },
  genrePressable: {
    width: "50%",
    marginBottom: 20,
  },
});

export default SearchScreen;
