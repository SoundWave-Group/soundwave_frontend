import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import axios from "axios";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

const UploadTrack = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const playTrack = async () => {
    if (file) {
      try {
        if (sound) {
          if (isPlaying) {
            await sound.pauseAsync();
          } else {
            await sound.playAsync();
          }
        } else {
          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: file.uri },
            { progressUpdateIntervalMillis: 1000 },
            onPlaybackStatusUpdate
          );
          setSound(newSound);
          await newSound.playAsync();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error("Error playing track:", error);
      }
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const seekForward = async () => {
    if (sound) {
      const newPosition = Math.min(position + 10000, duration);
      await sound.setPositionAsync(newPosition);
    }
  };

  const seekBackward = async () => {
    if (sound) {
      const newPosition = Math.max(position - 10000, 0);
      await sound.setPositionAsync(newPosition);
    }
  };

  const onSliderValueChange = async (value) => {
    if (sound) {
      const newPosition = value * duration;
      await sound.setPositionAsync(newPosition);
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "audio/*",
        copyToCacheDirectory: false,
      });
      if (result) {
        console.log("File selected:", result.assets[0].name);
        setFile(result.assets[0]);
      }
    } catch (err) {
      console.log("Error picking document:", err);
    }
  };

  const uploadTrack = async () => {
    if (!title || !artist || !file) {
      alert("Please fill in all fields and select a file");
      return;
    }

    setIsLoading(true);

    try {
      const fileInfo = await FileSystem.getInfoAsync(file.uri);
      if (!fileInfo.exists) {
        throw new Error("File does not exist");
      }

      const fileContent = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const formData = new FormData();
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("file", {
        uri: file.uri,
        type: file.mimeType,
        name: file.name,
        data: fileContent,
      });

      console.log("Uploading file...");
      const response = await axios.post(
        "https://soundwave-56af.onrender.com/api/tracks/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload progress: ${percentCompleted}%`);
          },
        }
      );

      console.log("Upload response:", response.data);

      if (response.data.success) {
        alert("Track uploaded successfully!");
        onUploadSuccess(response.data.trackDetails);
        setTitle("");
        setArtist("");
        setFile(null);
      } else {
        throw new Error("Upload failed: " + JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Error uploading track:", error);
      alert(
        "Failed to upload track. Please try again. Error: " + error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Track Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={"white"}
        style={styles.input}
      />
      <TextInput
        placeholder="Artist Name"
        value={artist}
        onChangeText={setArtist}
        placeholderTextColor={"white"}
        style={styles.input}
      />
      <Pressable onPress={pickDocument} style={styles.button}>
        <Text style={styles.buttonText}>Select Audio File</Text>
      </Pressable>
      <View style={styles.playerContainer}>
        {file && (
          <View style={styles.playerControls}>
            <Text style={styles.fileName}>Selected file: {file.name}</Text>
            <Text style={styles.fileSize}>
              Size: {(file.size / 1024 / 1024).toFixed(2)} MB
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10}
              value={position / duration}
              onValueChange={onSliderValueChange}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
            <Text style={styles.progressText}>
              {formatTime(position)} / {formatTime(duration)}
            </Text>
            <View style={styles.controlButtons}>
              <Pressable onPress={seekBackward} style={styles.controlButton}>
                <Ionicons name="play-back" size={24} color="white" />
              </Pressable>
              <Pressable onPress={playTrack} style={styles.controlButton}>
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={24}
                  color="white"
                />
              </Pressable>
              <Pressable onPress={seekForward} style={styles.controlButton}>
                <Ionicons name="play-forward" size={24} color="white" />
              </Pressable>
            </View>
          </View>
        )}
      </View>
      <Pressable
        onPress={uploadTrack}
        style={[styles.button, styles.uploadButton]}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Upload Track</Text>
        )}
      </Pressable>
      {isLoading && (
        <Text style={styles.loadingText}>Uploading... Please wait</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgreen",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    color: "white",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  uploadButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
  },
  playerControls: {
    marginBottom: -10,
  },
  fileName: {
    color: "white",
    fontSize: 16,
  },
  fileSize: {
    color: "white",
    fontSize: 16,
    marginVertical: 10,
  },
  slider: {
    width: "100%",
  },
  progressText: {
    color: "white",
    textAlign: "center",
    marginTop: 5,
  },
  controlButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  controlButton: {
    padding: 10,
    marginHorizontal: 20,
  },
  loadingText: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
  playerContainer: {
    backgroundColor: "#252525",
    padding: 20,
    height: "fit",
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default UploadTrack;
