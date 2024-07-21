import React, { useState } from "react";
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
  SafeAreaView,
  Modal,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const SoundwaveLogo = require("../assets/Soundwave-Logo.png");

export default function SignUp() {
  const [fullName, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSignUp = async () => {
    const data = {
      fullName,
      username,
      email,
      password,
      confirmPassword,
      country,
    };

    if (
      !fullName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !country
    ) {
      Alert.alert("Please fill all details");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://soundwave-56af.onrender.com/api/auth/signup",
        data
      );

      console.log(response);

      if (response.status === 200) {
        setLoading(false);
        Alert.alert("Success", "Account Created Successfully");
        navigation.navigate("LoginScreen");
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

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
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
      <View style={{ marginTop: 10 }}>
        <TextInput
          style={styles.inputBox}
          placeholder="Full Name *"
          value={fullName}
          onChangeText={setFullname}
          placeholderTextColor={"lightgreen"}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Username *"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={"lightgreen"}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Email *"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={"lightgreen"}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            secureTextEntry={true}
            placeholder="Password *"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={"lightgreen"}
          />
        </View>
        <TextInput
          style={styles.inputBox}
          secureTextEntry={true}
          placeholder="Confirm Password *"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor={"lightgreen"}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
          placeholderTextColor={"lightgreen"}
        />
      </View>

      <View>
        <Pressable
          onPress={handleSignUp}
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
          <Text style={{ fontSize: 20, textAlign: "center" }}>SIGN UP</Text>
        </Pressable>

        <View
          style={{
            marginTop: 50,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 18, marginHorizontal: 5, color: "white" }}>
            Already have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={{ fontSize: 18, color: "green" }}>Log In</Text>
          </Pressable>
        </View>

        <Pressable
          style={{ marginTop: 50 }}
          onPress={() => {
            Alert.alert(
              "SoundWave is a Clone of the SoundCloud Music App as a group project work \n\n Group 35 - Computer Science '26"
            );
          }}
        >
          <Text style={{ fontSize: 15, textAlign: "center", color: "white" }}>
            About App
          </Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(50, 153, 168)",
  },
});
