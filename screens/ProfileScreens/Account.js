import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

const Account = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const userData = await AsyncStorage.getItem("userDetails");

        if (userData) {
          setUserDetails(JSON.parse(userData));
          console.log(userData);
        }
      } catch (error) {
        console.error("Failed to load user details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleDeleteAccount = () => {
    if (!userDetails) return;

    Alert.alert(
      "DELETE ACCOUNT",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Yes",
          onPress: async () => {
            const username = userDetails.userProfile.username;

            try {
              const response = await fetch(
                `https://soundwave-56af.onrender.com/api/delete-user/${username}`,
                {
                  method: "DELETE",
                }
              );

              if (response.status === "200") {
                await AsyncStorage.clear();
                Alert.alert("Success", "Account Deleted Successfully");
                navigation.navigate("LandingScreen");
              } else {
                const errorData = await response.json();
                Alert.alert(
                  "Error",
                  errorData.message || "Failed to delete account"
                );
              }
            } catch (error) {
              Alert.alert(
                "Error",
                "An error occurred while deleting the account. Please try again later."
              );
              console.error("Delete account error:", error);
            }
          },
        },
        {
          text: "No",
          onPress: () => console.log("No"),
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign
              name="left"
              size={24}
              color="#0A4A3B"
              style={styles.back}
            />
          </Pressable>
          <Text style={styles.text}>Account</Text>
        </View>
        <View style={styles.content}>
          {userDetails ? (
            <>
              <View style={styles.field}>
                <Text style={styles.headText}>Full Name:</Text>
                <Text style={styles.paragraphText}>
                  {userDetails.userProfile.fullName}
                </Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.headText}>Username:</Text>
                <Text style={styles.paragraphText}>
                  {userDetails.userProfile.username}
                </Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.headText}>Email:</Text>
                <Text style={styles.paragraphText}>
                  {userDetails.userProfile.email}
                </Text>
              </View>
              <View style={styles.buttonBox}>
                <Button
                  title="Delete account"
                  pressed={handleDeleteAccount}
                  buttonStyle={styles.button}
                  textStyle={styles.buttonText}
                />
              </View>
            </>
          ) : (
            <Text>No user details available</Text>
          )}
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? 35 : 0,
  },

  container: {
    flex: 1,
    backgroundColor: "black",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  text: {
    color: "#0A4A3B",
    fontSize: 20,
    fontWeight: "600",
    width: "85%",
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  button: {
    height: 50,
    width: 360,
    alignItems: "flex-start",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "700",
    borderRadius: 10,
  },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#ff4256",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "400",
    marginHorizontal: 20,
  },
  headText: {
    color: "grey",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 5,
  },
  paragraphText: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 2,
  },
  field: {
    marginVertical: 5,
    backgroundColor: "#101010",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
