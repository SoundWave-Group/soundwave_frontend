const ACRCloudConfig = {
  host: "https://identify-eu-west-1.acrcloud.com",
  access_key: "998f25d85b1fae030bdfe9cf9cc7cd7b",
  access_secret: "cM80WlNUgyJ7xWKpJU4PPkfyr1ElUcbT6XVzG2ke",
};

import React, { useState } from "react";
import { Button, View, Text, Alert } from "react-native";
import { Audio } from "expo-av";
import CryptoJS from "crypto-js";

export default function App() {
  const [recording, setRecording] = useState(null);
  const [result, setResult] = useState(null);

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
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

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: formData,
      });

      const responseData = await response.json();
      setResult(responseData);
    } catch (err) {
      console.error("Failed to stop recording", err);
    } finally {
      setRecording(null);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      {result && <Text>{JSON.stringify(result, null, 2)}</Text>}
    </View>
  );
}
