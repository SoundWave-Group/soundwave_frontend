import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import axios from "axios";

const ACRCloudConfig = {
  host: "identify-eu-west-1.acrcloud.com",
  access_key: "998f25d85b1fae030bdfe9cf9cc7cd7b",
  access_secret: "cM80WlNUgyJ7xWKpJU4PPkfyr1ElUcbT6XVzG2ke",
};

const SongRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [songDetails, setSongDetails] = useState(null);

  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;

  const startRecording = async () => {
    setIsRecording(true);
    setSongDetails(null);
    await audioRecorderPlayer.startRecorder();
  };

  const stopRecording = async () => {
    setIsRecording(false);
    const result = await audioRecorderPlayer.stopRecorder();
    sendToACRCloud(result);
  };

  const sendToACRCloud = async (audioFilePath) => {
    setIsProcessing(true);

    const audioFile = {
      uri: audioFilePath,
      type: "audio/mp4",
      name: "audio.mp4",
    };

    const formData = new FormData();
    formData.append("sample", audioFile);
    formData.append("access_key", ACRCloudConfig.access_key);
    formData.append("sample_bytes", "8192"); // You can adjust the sample bytes according to your requirements

    const signature = generateSignature();
    formData.append("signature", signature);
    formData.append("timestamp", Math.floor(Date.now() / 1000));

    try {
      const response = await axios.post(
        `${ACRCloudConfig.host}/v1/identify`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setSongDetails(response.data.metadata.music[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const generateSignature = () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const stringToSign = `POST\n/v1/identify\n${ACRCloudConfig.access_key}\n${timestamp}`;
    return CryptoJS.HmacSHA1(
      stringToSign,
      ACRCloudConfig.access_secret
    ).toString(CryptoJS.enc.Base64);
  };

  return (
    <View style={styles.container}>
      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? stopRecording : startRecording}
      />
      {isProcessing && <ActivityIndicator size="large" color="#0000ff" />}
      {songDetails && (
        <View>
          <Text>Song Title: {songDetails.title}</Text>
          <Text>Artist: {songDetails.artists[0].name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SongRecognition;
