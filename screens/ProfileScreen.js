import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
  ActivityIndicator,
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
        <Text></Text>
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

          <View style={{ marginHorizontal: "auto" }}>
            <Text
              style={{
                marginHorizontal: "auto",
                borderBottomWidth: 1,
                color: "green",
              }}
            >
              Bio:
            </Text>
            <Text style={{ fontSize: 18 }}>{userDetails.userProfile.bio}</Text>
          </View>
        </View>
      </View>

      <View
        style={{ margin: 20, gap: 15, marginTop: 50, flexDirection: "row" }}
      >
        <View style={{ gap: 5 }}>
          <Text style={styles.text}>Name:</Text>
          <Text style={styles.text}>Username:</Text>
          <Text style={styles.text}>Email:</Text>
        </View>
        <View style={{ gap: 5, marginHorizontal: "auto" }}>
          <Text style={styles.textSecondary}>
            {userDetails.userProfile.fullName}
          </Text>
          <Text style={styles.textSecondary}>
            {userDetails.userProfile.username}
          </Text>
          <Text style={styles.textSecondary}>
            {userDetails.userProfile.email}
          </Text>
        </View>
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
