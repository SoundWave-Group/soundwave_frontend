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
  Button,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const SoundwaveLogo = require("../assets/Soundwave-Logo.png");

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [lastRememberedPassword, setLastRememberedPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

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

  const handlePasswordReset = async () => {
    if (!lastRememberedPassword || !newPassword || !confirmNewPassword) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }

    const data = {
      username,
      lastRememberedPassword,
      newPassword,
    };

    try {
      setLoading(true);
      const response = await axios.put(
        "https://soundwave-56af.onrender.com/api/settings/account/password",
        data
      );

      if (response.status === 200) {
        setLoading(false);
        setForgotPasswordVisible(false);
        Alert.alert("Success", "Password reset successfully");
      } else {
        setLoading(false);
        Alert.alert("Error", response.data.message || "Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error("Error response:", error.response);
        Alert.alert(
          "Error",
          error.response.data.message || "An error occurred. Please try again."
        );
      } else if (error.request) {
        console.error("Error request:", error.request);
        Alert.alert(
          "Error",
          "No response from server. Please check your internet connection."
        );
      } else {
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

        <Pressable
          style={{ marginTop: 20 }}
          onPress={() => setForgotPasswordVisible(true)}
        >
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              color: "lightgreen",
            }}
          >
            Forgot Password?
          </Text>
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

      <Modal
        transparent={true}
        visible={forgotPasswordVisible}
        animationType="slide"
        onRequestClose={() => setForgotPasswordVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Reset Password</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor={"grey"}
              color={"white"}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Last remembered password"
              value={lastRememberedPassword}
              onChangeText={setLastRememberedPassword}
              secureTextEntry={true}
              placeholderTextColor={"grey"}
              color={"white"}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="New password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={true}
              placeholderTextColor={"grey"}
              color={"white"}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              secureTextEntry={true}
              placeholderTextColor={"grey"}
              color={"white"}
            />
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Button
                title="Reset"
                onPress={handlePasswordReset}
                color="lightgreen"
              />
              <Button
                title="Cancel"
                onPress={() => setForgotPasswordVisible(false)}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>

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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "lightgreen",
  },
  modalInput: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 5,
    width: 250,
    marginBottom: 20,
    color: "white",
  },
});
