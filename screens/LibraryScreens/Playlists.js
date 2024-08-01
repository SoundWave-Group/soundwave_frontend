import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  Animated,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Playlists = () => {
  const navigation = useNavigation();
  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const rotation = new Animated.Value(0);

  const handleCreatePlaylist = async () => {
    try {
      const response = await fetch(
        "https://soundwave-56af.onrender.com/api/playlists/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ playlistTitle: newPlaylistName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create playlist");
      }

      const data = await response.json();
      const updatedPlaylists = [...playlists, data];
      setPlaylists(updatedPlaylists);
      setFilteredPlaylists(updatedPlaylists);
      setModalVisible(false);
      setNewPlaylistName("");
      fetchPlaylists();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to create playlist");
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await fetch(
        "https://soundwave-56af.onrender.com/api/playlists"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch playlists");
      }

      const data = await response.json();
      setPlaylists(data.playlists);
      setFilteredPlaylists(data.playlists);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePlaylist = async (id) => {
    try {
      const response = await fetch(
        `https://soundwave-56af.onrender.com/api/playlists/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete playlist");
      }
      fetchPlaylists();

      Alert.alert("Success", "Playlist has been deleted");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to Delete Playlist");
    }
  };

  const confirmDeletePlaylist = (id) => {
    Alert.alert(
      "Delete Playlist",
      "Are you sure you want to delete this playlist?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deletePlaylist(id),
        },
      ],
      { cancelable: true }
    );
  };

  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredPlaylists(playlists);
      return;
    }

    const filtered = playlists.filter((playlist) =>
      playlist.playlistTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlaylists(filtered);
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color={"white"} />
        </Pressable>
        <Text style={styles.headerText}>Playlists</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.searchInput, { color: "lightgreen" }]}
            placeholder="Search Songs, Artists & More"
            placeholderTextColor="lightgreen"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        <Pressable
          style={styles.createButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons
            name="add-circle"
            size={25}
            style={styles.createButtonIcon}
          />
        </Pressable>

        <View style={styles.playlistContainer}>
          <FlatList
            data={filteredPlaylists}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.playlistItem}
                onPress={() =>
                  navigation.navigate("SongListScreen", {
                    genre: item.playlistTitle,
                    songs: item.playlistTracks,
                  })
                }
                onLongPress={() => {
                  confirmDeletePlaylist(item.playlistTitle);
                }}
              >
                <Text style={styles.playlistTitle}>{item.playlistTitle}</Text>
                <Ionicons name="chevron-forward" size={25} color={"white"} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item._id}
          />
        </View>
      </View>

      <StatusBar style="light" />

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Create New Playlist</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter Playlist Name"
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
              placeholderTextColor={"grey"}
              color={"white"}
            />
            <View style={{ flexDirection: "row" }}>
              <Button
                title="Save"
                onPress={handleCreatePlaylist}
                color="lightgreen"
              />
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    marginHorizontal: "auto",
    color: "white",
  },
  content: {
    marginTop: 10,
    marginLeft: 10,
  },
  title: {
    fontSize: 25,
    marginLeft: 5,
    color: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    width: "95%",
    borderWidth: 0.5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    height: 40,
    borderRadius: 10,
    borderColor: "green",
  },
  createButton: {
    backgroundColor: "green",
    padding: 10,
    width: 100,
    height: 50,
    borderRadius: 10,
    marginTop: 20,
  },
  createButtonIcon: {
    margin: "auto",
    color: "white",
  },
  playlistContainer: {
    marginTop: 20,
  },
  playlistItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#101010",
  },
  playlistTitle: {
    color: "white",
    fontSize: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "#101010",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
  },
  modalInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "lightgreen",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default Playlists;
