import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Playlists = () => {
  const navigation = useNavigation();

  const [playlist, setPlaylists] = useState(null);

  const handleCreatePlaylist = () => {
    const playlistName = Alert.prompt(
      "Create New Playlist",
      "Enter Playlist Name"
    );
  };

  const fetchPlaylists = async () => {
    const response = await fetch(
      "https://soundwave-56af.onrender.com/api/playlists"
    );

    if (response) {
      setPlaylists(JSON.stringify(response));
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 40,
          marginHorizontal: 10,
        }}
      >
        <View>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={25} color={"white"} />
          </Pressable>
        </View>
        <Text
          style={{
            fontSize: 20,
            marginHorizontal: "auto",
            color: "white",
          }}
        >
          Playlists
        </Text>
      </View>

      <View style={{ marginTop: 10, marginLeft: 10 }}>
        <Text style={{ fontSize: 25, marginLeft: 5, color: "white" }}>
          Playlists
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={{
              width: "85%",
              borderWidth: 0.5,
              paddingHorizontal: 10,
              marginHorizontal: 5,
              marginVertical: 10,
              height: 40,
              borderRadius: 10,
              borderColor: "green",
            }}
            placeholder="Songs, Artist & More"
            placeholderTextColor="lightgreen"
          />
          <Ionicons name="shuffle" size={30} color={"white"} />
        </View>

        <Pressable
          style={{
            backgroundColor: "green",
            padding: 10,
            width: 100,
            height: 50,
            borderRadius: 10,
            marginTop: 20,
          }}
          onPress={handleCreatePlaylist}
        >
          <Ionicons
            name="add-circle"
            size={25}
            style={{ margin: "auto", color: "white" }}
          />
        </Pressable>

        <View style={{ marginTop: 20 }}>
          {!playlist ? (
            <Text style={{ fontSize: 25 }}>Create a playlist </Text>
          ) : (
            <FlatList
              data={playlist}
              renderItem={({ item }) => (
                <Text style={{ fontSize: 20 }}>{item}</Text>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </View>

      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  content: {
    flex: 1,
  },
});

export default Playlists;
