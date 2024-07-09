import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Easing,
} from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { Audio } from "expo-av";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Ionicons } from "@expo/vector-icons";

const ShazamScreen = () => {
  const [recording, setRecording] = useState(null);
  const [result, setResult] = useState(null);
  const scale = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startRecording = async () => {
    try {
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const formData = new FormData();
      formData.append("sample", {
        uri,
        type: "audio/x-wav",
        name: "sample.wav",
      });

      const timestamp = Math.floor(Date.now() / 1000);
      const stringToSign = `POST\n/v1/identify\n${ACRCloudConfig.access_key}\n${timestamp}`;
      const signature = CryptoJS.HmacSHA1(
        stringToSign,
        ACRCloudConfig.access_secret
      ).toString(CryptoJS.enc.Base64);
      const headers = {
        Authorization: `ACRCloud ${ACRCloudConfig.access_key}:${signature}`,
        Date: new Date().toUTCString(),
      };
      const url = `${ACRCloudConfig.host}/v1/identify`;
      const response = await axios.post(url, formData, { headers });
      setResult(response.data);
    } catch (err) {
      console.error("Failed to stop recording", err);
    } finally {
      setRecording(null);
    }
  };

  const handlePress = () => {
    startAnimation();
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <View style={styles.container}>
      <TapGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            handlePress();
          }
        }}
      >
        <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
          <View style={styles.shazamOuterContainer}>
            <View style={styles.shazamInnerContainer}>
              <Pressable onPress={handlePress}>
                <Ionicons name="musical-notes" size={70} color="white" />
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </TapGestureHandler>
      <Text style={styles.instructions}>Tap to Identify A Song</Text>
      {result && <Text>{JSON.stringify(result, null, 2)}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  shazamOuterContainer: {
    borderWidth: 2,
    borderColor: "lightgreen",
    borderRadius: 200,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgreen",
  },
  shazamInnerContainer: {
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 100,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
  instructions: {
    fontSize: 18,
    marginTop: 40,
    color: "green",
  },
  resetButton: {
    marginBottom: 50,
  },
});

export default ShazamScreen;
