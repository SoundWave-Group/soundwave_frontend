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

export default function SignUp() {
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
        <TextInput style={styles.inputBox} placeholder="Full Name" />
        <TextInput style={styles.inputBox} placeholder="Username" />
        <TextInput
          style={styles.inputBox}
          secureTextEntry={true}
          placeholder="Password"
        />
        <TextInput
          style={styles.inputBox}
          secureTextEntry={true}
          placeholder="Confirm Password"
        />
        <TextInput style={styles.inputBox} placeholder="Country" />
      </View>

      <View>
        <Pressable
          onPress={() => navigation.navigate("MainScreen")}
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
          <Text style={{ fontSize: 20, textAlign: "center" }}>REGISTER</Text>
        </Pressable>

        <Text style={{ marginTop: 50, fontSize: 18 }}>
          Already have an account?
          <Pressable
            onPress={() => navigation.navigate("LoginScreen")}
            style={{ marginTop: -2.6 }}
          >
            <Text style={{ color: "green", fontSize: 18, marginLeft: 5 }}>
              Log In
            </Text>
          </Pressable>
        </Text>

        <Text style={{ marginTop: 50, fontSize: 15, textAlign: "center" }}>
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
    backgroundColor: "rgb(193, 247, 201)",
    padding: 10,
    paddingTop: 20,
    borderRadius: 5,
    width: 300,
    margin: 10,
  },
});
