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

    const data = {
      username,
      password,
    };

    try {
      setLoading(true);
      const response = await fetch(
        "https://soundwave-56af.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const getUser = await fetch(
          `https://soundwave-56af.onrender.com/api/user-profile/${username}`
        );
        const userData = await getUser.json(); // Await here
        await AsyncStorage.setItem("userDetails", JSON.stringify(userData));
        console.log(userData);
        setLoading(false);
        Alert.alert("Success", "Logged in successfully");
        navigation.navigate("MainScreen");
      } else {
        setLoading(false);
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to log in. Please try again later.");
      console.log(error);
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
        />
        <TextInput
          style={[styles.inputBox, { marginTop: 10 }]}
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />

        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 17,
            color: "grey",
          }}
        >
          Forgot your Password?
        </Text>
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
        <Pressable
          onPress={() => navigation.navigate("MainScreen")}
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
            Don't have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate("SignUpScreen")}>
            <Text style={{ fontSize: 18, color: "green" }}>Sign Up</Text>
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
          <Text style={{ fontSize: 15, textAlign: "center", marginTop: 120 }}>
            Need Help?
          </Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    borderStyle: "solid",
    backgroundColor: "#CCEAE3",
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
