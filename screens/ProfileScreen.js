import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newFullName, setNewFullName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const userData = await AsyncStorage.getItem("userDetails");
        console.log(userData);

        if (userData) {
          setUserDetails(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChangeDetails = async () => {
    const username = userDetails.userProfile.username;

    <Modal visible={true} animationType="slide" transparent={true}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Text style={{ fontSize: 20, color: "green" }}>Edit Profile</Text>
          <TextInput
            placeholder="Full Name"
            value={newFullName}
            onChangeText={setNewFullName}
            style={styles.input}
          />
          <TextInput
            placeholder="Bio"
            value={newBio}
            onChangeText={setNewBio}
            style={styles.input}
          />
          <TextInput
            placeholder="Location"
            value={newLocation}
            onChangeText={setNewLocation}
            style={styles.input}
          />
          <Pressable onPress={handleEditProfile}>
            <Text style={{ color: "green", fontSize: 20 }}>Save</Text>
          </Pressable>
        </View>
      </View>
    </Modal>;

    const body = {
      username,
      newBio,
      newFullName,
      newLocation,
    };

    const response = await fetch(
      `https://soundwave-56af.onrender.com/api/user-profile/edit/${username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setUserDetails(data);
      await AsyncStorage.setItem(
        "userDetails",
        JSON.stringify(userDetails.userProfile)
      );
    }

    console.log("User details updated", response);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  if (!userDetails) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No user details available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 25,
        }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <View>
            <Ionicons name="chevron-back" color="green" size={25} />
          </View>
        </Pressable>

        <Text
          style={{
            fontSize: 20,
            color: "green",
          }}
        >
          User Profile
        </Text>
        <Pressable onPress={() => navigation.navigate("Settings")}>
          <View>
            <Ionicons name="settings-outline" color="green" size={25} />
          </View>
        </Pressable>
      </View>

      <View>
        <View style={{ marginHorizontal: "auto" }}>
          <Image
            source={require("../assets/artistes/Dave.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              margin: "auto",
              marginVertical: 10,
            }}
          />
        </View>
      </View>

      <View
        style={{ margin: 20, gap: 15, marginTop: 20, flexDirection: "row" }}
      >
        <View style={{ gap: 20 }}>
          <Text style={styles.text}>Name:</Text>
          <Text style={styles.text}>Username:</Text>
          <Text style={styles.text}>Email:</Text>
          <Text style={styles.text}>Bio:</Text>
          <Text style={styles.text}>Location:</Text>
        </View>
        <View style={{ gap: 20, marginHorizontal: "auto" }}>
          <Text style={styles.textSecondary}>
            {userDetails.userProfile.fullName}
          </Text>
          <Text style={styles.textSecondary}>
            {userDetails.userProfile.username}
          </Text>
          <Text style={styles.textSecondary}>
            {userDetails.userProfile.email}
          </Text>
          <Text style={styles.textSecondary}>
            {userDetails.userProfile.bio}
          </Text>
          <Text style={styles.textSecondary}>
            {userDetails.userProfile.location}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: "auto",
          backgroundColor: "lightgreen",
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: "auto",
          marginBottom: 20,
        }}
      >
        <Pressable onPress={handleChangeDetails}>
          <Text style={{ fontSize: 20 }}>Edit Profile</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 18,
    color: "green",
  },
  textSecondary: {
    fontSize: 18,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
