import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Picker, PickerIOS } from "@react-native-picker/picker";
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
      Alert.alert("Please Fill all Details");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        "https://soundwave-56af.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      console.log(data);

      if (response.ok) {
        setLoading(false);
        Alert.alert("Success", "Account Created Successfully");
        navigation.navigate("LoginScreen");
      } else {
        setLoading(false);
        Alert.alert("Error", "Account not Created");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert(
        "Error",
        "An error occurred. Please try again later. [catch block]"
      );
    }
  };

  const handleGoogleSignUp = async () => {
    navigator.navigate("MainScreen");
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
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Username *"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Email *"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.inputBox}
          secureTextEntry={true}
          placeholder="Password *"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.inputBox}
          secureTextEntry={true}
          placeholder="Confirm Password *"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
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

        {/* Google SignUp */}
        <Pressable
          onPress={handleGoogleSignUp}
          style={{
            marginTop: 10,
            borderWidth: 1,
            borderColor: "green",
            paddingLeft: 50,
            paddingRight: 50,
            width: 200,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ marginHorizontal: "auto" }}>
            <Ionicons name="logo-google" size={24} color="green" />
          </Text>
        </Pressable>

        <View
          style={{
            marginTop: 50,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 18, marginHorizontal: 5 }}>
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
          <Text style={{ fontSize: 15, textAlign: "center" }}>Need Help?</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  inputBox: {
    borderStyle: "solid",
    backgroundColor: "#CCEAE3",
    padding: 10,
    paddingTop: 15,
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
