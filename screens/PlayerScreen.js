import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import AudioLoaderUI from "../components/AudioLoaderUI";
import { useNavigation } from "@react-navigation/native";

const placeholder = require("../assets/singer4.jpg");

const PlayerScreen = () => {
  const navigator = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 20 }}>
        <Pressable
          onPress={() => {
            navigator.goBack();
          }}
        >
          <Ionicons name="chevron-down" size={24} color="black" />
        </Pressable>
      </View>
      <View>
        <Image
          source={placeholder}
          style={{
            width: 300,
            height: 300,
            marginHorizontal: "auto",
            marginTop: 20,
            borderRadius: 10,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            marginTop: 20,
            fontWeight: "bold",
          }}
        >
          We Can't Be Friends
        </Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            marginTop: 5,
            color: "gray",
          }}
        >
          Ariana Grande
        </Text>
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          <AudioLoaderUI />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default PlayerScreen;
