import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const SoundwaveLogo = require("../assets/Soundwave-Logo.png");

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    const data = { username, password };

    try {
      setLoading(true);

      const response = await axios.post(
        "https://soundwave-56af.onrender.com/api/auth/login",
        data
      );

      if (response.status === 200) {
        try {
          const getUserResponse = await axios.get(
            `https://soundwave-56af.onrender.com/api/user-profile/${username}`
          );

          const userData = getUserResponse.data;
          await AsyncStorage.setItem("userDetails", JSON.stringify(userData));
          setLoading(false);
          navigation.navigate("MainScreen");
        } catch (error) {
          setLoading(false);
          console.error("Error fetching user profile:", error);
          Alert.alert(
            "Error",
            "Failed to fetch user profile. Please try again later."
          );
        }
      } else {
        setLoading(false);
        Alert.alert("Error", response.data.message || "Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response:", error.response);
        Alert.alert(
          "Error",
          error.response.data.message || "An error occurred. Please try again."
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error request:", error.request);
        Alert.alert(
          "Error",
          "No response from server. Please check your internet connection."
        );
      } else {
        // Something else caused an error
        console.error("Error message:", error.message);
        Alert.alert("Error", "An error occurred. Please try again.");
      }
    }
  };
  const LoadingModal = ({ visible }) => {
    return (
      <Modal transparent={true} animationType="fade" visible={visible}>
        <View style={styles.modalBackground}>
          <ActivityIndicator size="large" color="green" />
        </View>
      </Modal>
    );
  };

  if (loading) {
    return <LoadingModal visible={loading} />;
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={SoundwaveLogo} />
        <Text
          style={{
            fontSize: 30,
            fontStyle: "italic",
            textAlign: "center",
            color: "#0A4A3B",
          }}
        >
          SoundWave
        </Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <TextInput
          style={styles.inputBox}
          placeholder="Username or Email"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={"lightgreen"}
        />
        <TextInput
          style={[styles.inputBox, { marginTop: 10 }]}
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor={"lightgreen"}
        />
      </View>

      <View>
        <Pressable
          onPress={handleLogin}
          style={{
            marginTop: 50,
            backgroundColor: "#CCEAE3",
            paddingLeft: 50,
            paddingRight: 50,
            width: 200,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center" }}>LOG IN</Text>
        </Pressable>

        <View
          style={{
            marginTop: 50,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 18, marginHorizontal: 5, color: "white" }}>
            Don't have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate("SignUpScreen")}>
            <Text style={{ fontSize: 18, color: "lightgreen" }}>Sign Up</Text>
          </Pressable>
        </View>

        <Pressable
          style={{ marginTop: 50 }}
          onPress={() => {
            Alert.alert(
              "SoundWave is a Clone of the SoundCloud Music App as a Group Project Work \n\n Group 35 - Computer Science '26"
            );
          }}
        >
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              marginTop: 120,
              color: "white",
            }}
          >
            About App
          </Text>
        </Pressable>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "lightgreen",
    padding: 10,
    paddingTop: 20,
    borderRadius: 5,
    width: 300,
    margin: 10,
    color: "lightgreen",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
