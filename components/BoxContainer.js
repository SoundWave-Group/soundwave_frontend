import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BoxContainer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.boxContainer}>
      <Text style={{ fontSize: 25, textAlign: "center", color: "white" }}>
        From the latest to the greatest hits, play your favorite tracks on
        SoundWave now!
      </Text>
      <View style={{ marginTop: 100 }}>
        <Pressable
          onPress={() => navigation.navigate("LoginScreen")}
          style={{
            borderStyle: "solid",
            borderColor: "lightgreen",
            borderWidth: 5,
            paddingLeft: 30,
            paddingRight: 30,
            padding: 5,
            borderRadius: 50,
            backgroundColor: "lightgreen",
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
