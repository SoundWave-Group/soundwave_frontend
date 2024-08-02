import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import UploadTrack from "../../components/UploadTrack"; // Make sure this path is correct
import axios from "axios";

const Uploads = () => {
  const navigation = useNavigation();
  const [tracks, setTracks] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await axios.get(
        "https://soundwave-56af.onrender.com/api/tracks"
      );
      setTracks(response.data);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  const handleUploadSuccess = (newTrack) => {
    setTracks([...tracks, newTrack]);
    setShowUploadForm(false);
  };

  const renderTrack = ({ item }) => (
    <View style={styles.trackItem}>
      <Text style={styles.trackTitle}>{item.title}</Text>
      <Text style={styles.trackArtist}>{item.artist}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color={"white"} />
        </Pressable>
        <Text style={styles.headerTitle}>Uploads</Text>
      </View>

      {tracks.length > 0 ? (
        <FlatList
          data={tracks}
          renderItem={renderTrack}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={styles.emptyState}></View>
      )}

      {showUploadForm ? (
        <UploadTrack onUploadSuccess={handleUploadSuccess} />
      ) : (
        <Pressable
          style={styles.uploadButton}
          onPress={() => setShowUploadForm(true)}
        >
          <Text style={styles.uploadButtonText}>Upload a Track</Text>
        </Pressable>
      )}

      <StatusBar style="light" />
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
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    marginLeft: 20,
    color: "white",
  },
  emptyState: {
    margin: 20,
  },
  emptyStateTitle: {
    fontSize: 25,
    color: "white",
  },
  emptyStateSubtitle: {
    fontSize: 20,
    marginTop: 10,
    color: "white",
  },
  uploadButton: {
    backgroundColor: "green",
    padding: 10,
    width: 150,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "center",
  },
  uploadButtonText: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
  },
  trackItem: {
    backgroundColor: "#333",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  trackTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  trackArtist: {
    fontSize: 14,
    color: "#ccc",
  },
});

export default Uploads;
