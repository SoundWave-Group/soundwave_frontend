import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Platform,
  Switch,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
import { StatusBar } from "expo-status-bar";

const Analytics = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
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
          <Text style={styles.text}>Analytics</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.headText}>
            Help improve your SoundWave by sending us regular usage and device
            data
          </Text>
          <View style={styles.toggler}>
            <Text>No</Text>
            <Switch
              trackColor={{ false: "#767577", true: "rgba(98, 218, 92, 1)" }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={styles.switch}
            />
            <Text>Yes</Text>
          </View>
          <Text style={styles.paragraphText}>
            Changes require an app restart to become effective.
          </Text>
          <Button
            title="Learn more in our Privacy Policy"
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default Analytics;

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
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    width: "85%",
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    paddingBottom: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  headText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 5,
  },
  paragraphText: {
    color: "grey",
    fontSize: 15,
    fontWeight: "400",
    paddingVertical: 30,
  },
  toggler: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    marginVertical: 10,
  },
  buttonText: {
    color: "rgba(9, 202, 225, 1)",
    fontSize: 15,
  },
  switch: {
    marginHorizontal: 5,
  },
});
