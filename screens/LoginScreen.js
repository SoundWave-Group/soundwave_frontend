import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";

const SoundwaveLogo = require("../assets/Soundwave-Logo.png");

export default function App() {
  const navigation = useNavigation();
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
        <TextInput style={styles.inputBox} placeholder="Username" />
        <TextInput style={styles.inputBox} placeholder="Password" />

        <Text style={{ textAlign: "center", marginTop: 10, fontSize: 17 }}>
          Forgot your Password?
        </Text>
      </View>

      <View>
        <Pressable
          onPress={() => navigation.navigate("HomeScreen")}
          style={{
            marginTop: 50,
            backgroundColor: "lightgreen",
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

        <Text style={{ marginTop: 50, fontSize: 18 }}>
          Don't have an account? <Text style={{ color: "green" }}>Sign Up</Text>
        </Text>

        <Text style={{ marginTop: 150, fontSize: 15, textAlign: "center" }}>
          Need Help?
        </Text>
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
    backgroundColor: "lightgreen",
    padding: 10,
    paddingTop: 20,
    borderRadius: 5,
    width: 300,
    margin: 10,
  },
});
