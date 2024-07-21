import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BoxContainer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.boxContainer}>
      <Text style={{ fontSize: 23, textAlign: "center", color: "white" }}>
        From the <Text style={{ color: "lightgreen" }}>latest</Text> to the
        <Text style={{ color: "lightgreen" }}> greatest</Text> hits, play your
        favorite tracks on{" "}
        <Text style={{ color: "lightgreen" }}>SoundWave</Text> now!
      </Text>
      <View style={{ marginTop: 100 }}>
        <Pressable
          onPress={() => navigation.navigate("LoginScreen")}
          style={{
            borderStyle: "solid",
            borderColor: "#39C0D4",
            borderWidth: 2,
            paddingLeft: 30,
            paddingRight: 30,
            padding: 5,
            borderRadius: 50,
            backgroundColor: "#3BE4BB",
          }}
        >
          <Text style={{ fontSize: 25, color: "black" }}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: "black",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: -50,
    padding: 50,
    paddingBottom: 100,
    width: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});

export default BoxContainer;
