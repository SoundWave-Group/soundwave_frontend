import { View, Text, StyleSheet, StatusBar, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DownloadScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 60,
          marginHorizontal: 10,
        }}
      >
        <View>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={25} color={"white"} />
          </Pressable>
        </View>
        <Text
          style={{
            fontSize: 20,
            marginHorizontal: "auto",
            color: "white",
          }}
        >
          Downloads
        </Text>
      </View>

      <View style={{ marginTop: 10, marginLeft: 10 }}>
        <Text style={{ fontSize: 25, margin: 5, color: "white" }}>
          No downloads yet...{" "}
        </Text>
      </View>

      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  content: {
    flex: 1,
  },
});

export default DownloadScreen;
