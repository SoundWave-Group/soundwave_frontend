import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
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
  Platform,
  Modal,
  ActivityIndicator,
  ScrollView,
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
          <ActivityIndicator size="large" color="white" />
        </View>
      </Modal>
    );
  };

  if (loading) {
    return <LoadingModal visible={loading} />;
  }

  const DropdownMenu = () => {
    return (
      <RNPickerSelect
        style={{
          inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 4,
            color: "black",
            margin: 10,
            paddingRight: 30, // to ensure the text is never behind the icon
          },
          inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: "purple",
            borderRadius: 8,
            color: "black",
            paddingRight: 30, // to ensure the text is never behind the icon
          },
        }}
        placeholder={{ label: "Select a country", value: null }}
        onValueChange={(value) => setCountry(value)}
        items={[
          { label: "Nigeria", value: "Nigeria" },
          { label: "Ghana", value: "Ghana" },
          { label: "Kenya", value: "Kenya" },
          { label: "South Africa", value: "South Africa" },
          { label: "Tanzania", value: "Tanzania" },
          { label: "Uganda", value: "Uganda" },
          { label: "Zambia", value: "Zambia" },
          { label: "Zimbabwe", value: "Zimbabwe" },
        ]}
      />
    );
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <ScrollView>
        <View>
          <Image source={SoundwaveLogo} style={{ marginHorizontal: "auto" }} />
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
            editable={false}
            onChangeText={setCountry}
            placeholderTextColor={"lightgreen"}
          />
          <DropdownMenu />
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
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "white",
              }}
            >
              Already have an account?
            </Text>
            <Pressable onPress={() => navigation.navigate("LoginScreen")}>
              <Text
                style={{
                  fontSize: 18,
                  color: "green",
                  marginHorizontal: 5,
                }}
              >
                Log In
              </Text>
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
      </ScrollView>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },
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
    color: "lightgreen",
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
    backgroundColor: "black",
  },
});
