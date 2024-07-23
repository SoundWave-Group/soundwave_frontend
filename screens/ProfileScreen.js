import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Modal,
  TextInput,
  Button,
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

  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [newDetail, setNewDetail] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const userData = await AsyncStorage.getItem("userDetails");
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

  const handleEditPress = (field) => {
    setCurrentField(field);
    setModalVisible(true);
  };

  const handleSaveDetails = async () => {
    try {
      const updatedDetails = {
        ...userDetails,
        userProfile: {
          ...userDetails.userProfile,
          [currentField]: newDetail,
        },
      };
      setUserDetails(updatedDetails);
      await AsyncStorage.setItem("userDetails", JSON.stringify(updatedDetails));

      const apiUrl = `https://soundwave-56af.onrender.com/api/user-profile/edit/${userDetails.id}`;
      await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDetails.userProfile),
      });

      setModalVisible(false);
    } catch (error) {
      console.error("Failed to save user details", error);
    }
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
    <SafeAreaView style={[styles.container, styles.AndroidSafeArea]}>
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
            source={require("../assets/singer1.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 30,
              margin: "auto",
              marginVertical: 20,
            }}
          />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <View style={{ marginHorizontal: 20, gap: 10 }}>
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() => handleEditPress("fullName")}
          >
            <Text style={styles.text}>NAME</Text>
            <Text style={styles.textSecondary}>
              {userDetails.userProfile.fullName}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() => handleEditPress("username")}
          >
            <Text style={styles.text}>USERNAME</Text>
            <Text style={styles.textSecondary}>
              {userDetails.userProfile.username}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() => handleEditPress("email")}
          >
            <Text style={styles.text}>EMAIL</Text>
            <Text style={styles.textSecondary}>
              {userDetails.userProfile.email}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() => handleEditPress("bio")}
          >
            <Text style={styles.text}>BIO</Text>
            <Text style={styles.textSecondary}>
              {userDetails.userProfile.bio}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: "auto",
          marginTop: "auto",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#252525" }}>
          Tap on any detail above to edit
        </Text>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Edit {currentField}</Text>
            <TextInput
              style={styles.modalInput}
              placeholder={`Enter new ${currentField}`}
              value={newDetail}
              onChangeText={setNewDetail}
              placeholderTextColor={"grey"}
              color={"white"}
            />
            <View style={{ flexDirection: "row" }}>
              <Button
                title="Save"
                onPress={handleSaveDetails}
                color="lightgreen"
              />
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar style="light" />
    </SafeAreaView>
  );
};

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
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#101010",
  },
  text: {
    fontSize: 18,
    color: "green",
  },
  textSecondary: {
    fontSize: 18,
    color: "white",
    marginLeft: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "#101010",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
  },
  modalInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "lightgreen",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default ProfileScreen;
