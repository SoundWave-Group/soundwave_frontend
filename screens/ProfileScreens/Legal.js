import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";

const Legal = () => {
  const navigation = useNavigation();
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
          <Text style={styles.text}>Legal</Text>
        </View>
        <View>
          <Text style={styles.headText}></Text>
          <Text style={styles.paragraphText}></Text>
          <Button
            title=""
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Legal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
});
