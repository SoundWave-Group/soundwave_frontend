import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import BottomNavigation from "../components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 60,
          marginHorizontal: 25,
        }}
      >
        <View>
          <Pressable onPress={() => navigation.navigate("LibraryScreen")}>
            <Ionicons name="chevron-back" size={25} />
          </Pressable>
        </View>
        <Text
          style={{
            fontSize: 20,
            marginHorizontal: "auto",
            color: "green",
          }}
        >
          User Profile
        </Text>
        <View>
          <Ionicons name="settings-outline" color="green" size={25} />
        </View>
      </View>

      <View>
        <View style={{ margin: "auto" }}>
          <Image
            source={require("../assets/adaptive-icon.png")}
            style={{
              width: 100,
              height: 100,
              borderWidth: 2,
              borderRadius: 100,
              margin: "auto",
              marginVertical: 10,
            }}
          />
          <Text style={{ fontSize: 15, color: "green" }}>
            Edit Profile Image
          </Text>
        </View>
      </View>

      <View
        style={{ margin: 20, gap: 15, marginTop: 50, flexDirection: "row" }}
      >
        <View style={{ gap: 5 }}>
          <Text style={styles.text}>Name:</Text>
          <Text style={styles.text}>Username:</Text>
          <Text style={styles.text}>Email:</Text>
          <Text style={styles.text}>Bio:</Text>
        </View>
        <View style={{ gap: 5 }}>
          <Text style={styles.textSecondary}>Awarikaro Rudolph Hodds</Text>
          <Text style={styles.textSecondary}>@hodd</Text>
          <Text style={styles.textSecondary}>hodd@st.knust.edu.gh</Text>
          <Text style={styles.textSecondary}>I am batman</Text>
        </View>
      </View>

      <BottomNavigation />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    color: "green",
  },
  textSecondary: {
    fontSize: 20,
  },
});

export default ProfileScreen;
