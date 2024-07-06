import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Switch,
  Linking,
  Share,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Button from "../../components/Button";

const openURL = (url) => {
  Linking.openURL(url).catch((err) =>
    console.error("Failed to open URL:", err)
  );
};

const shareApp = async () => {
  try {
    const result = await Share.share({
      message:
        "Check out this amazing app! Download it from the following link: https://www.soundwave.com/app-download",
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // The shared action was completed by the user using a specific activity
        console.log("Shared with activity type:", result.activityType);
      } else {
        // The shared action was completed by the user
        console.log("Share was successful");
      }
    } else if (result.action === Share.dismissedAction) {
      // The shared action was dismissed by the user
      console.log("Share was dismissed");
    }
  } catch (error) {
    console.error("Error sharing the app:", error.message);
  }
};

const Settings = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <SafeAreaView style={styles.container}>
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
          <Feather
            name="settings"
            size={24}
            color="#0A4A3B"
            style={styles.settingsBtn}
          />
          <Text style={styles.text}>Settings</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.toggler}>
            <Text style={styles.autoBtn}>Autoplay related tracks</Text>
            <Switch
              trackColor={{ false: "#767577", true: "rgba(98, 218, 92, 1)" }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.buttonBox}>
            <Button
              title="Account"
              pressed={() => {
                navigation.navigate("Account");
              }}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
            <FontAwesome5 name="angle-right" size={24} color="black" />
          </View>
          <View style={styles.buttonBox}>
            <Button
              title="Inbox settings"
              pressed={() => {
                navigation.navigate("Inbox");
              }}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
            <FontAwesome5 name="angle-right" size={24} color="black" />
          </View>
          <View style={styles.buttonBox}>
            <Button
              title="Notifications"
              pressed={() => {
                navigation.navigate("Notifications");
              }}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
            <FontAwesome5 name="angle-right" size={24} color="black" />
          </View>
          <View style={styles.buttonBox}>
            <Button
              title="Storage"
              pressed={() => {
                navigation.navigate("Storage");
              }}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
            <FontAwesome5 name="angle-right" size={24} color="black" />
          </View>
          <View style={styles.buttonBox}>
            <Button
              title="Analytics"
              pressed={() => {
                navigation.navigate("Analytics");
              }}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
            <FontAwesome5 name="angle-right" size={24} color="black" />
          </View>
          <View style={styles.buttonBox}>
            <Button
              title="Advertising"
              pressed={() => {
                navigation.navigate("Advertising");
              }}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
            <FontAwesome5 name="angle-right" size={24} color="black" />
          </View>
          <View style={styles.buttonBox}>
            <Button
              title="Share"
              pressed={shareApp}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
          <View style={styles.buttonBox}>
            <Button
              title="Contact support"
              pressed={() => openURL("https://www.google.com")}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
          <View style={styles.buttonBox}>
            <Button
              title="Legal"
              pressed={() => {
                navigation.navigate("Legal");
              }}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
            />
            <FontAwesome5 name="angle-right" size={24} color="black" />
          </View>
        </View>
        <Button
          title="Sign Out"
          buttonStyle={styles.signOut}
          textStyle={styles.signOutText}
          pressed={() => {
            navigation.navigate("SplashScreen");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    color: "#0A4A3B",
    fontSize: 20,
    fontWeight: "600",
  },
  header: {
    alignItems: "center",
    padding: 20,
    paddingBottom: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  back: {
    marginRight: 100,
  },
  settingsBtn: {
    marginRight: 5,
  },
  content: {
    flex: 1,
    padding: 10,
    marginRight: 20,
  },
  toggler: {
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 0,
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    color: "white",
    height: 50,
    width: 360,
    alignItems: "Left",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "700",
    borderRadius: "10px",
  },
  buttonBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginLeft: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "400",
  },
  autoBtn: {
    color: "black",
    fontSize: 20,
    marginLeft: 5,
    fontWeight: "400",
  },
  signOut: {
    backgroundColor: "#0A4A3B",
    height: 50,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "700",
    borderRadius: "10px",
    marginVertical: 50,
    alignSelf: "center",
  },
  signOutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
