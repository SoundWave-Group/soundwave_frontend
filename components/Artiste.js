import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const Artiste = ({ artisteName, image }) => {
  const navigation = useNavigation();
  return (
    <View style={{ marginHorizontal: 5 }}>
      <View style={{ alignItems: "center", borderWidth: 1 }}>
        <Image source={image} style={styles.imageBox} />

        <Text
          style={{
            color: "green",
            fontSize: 16,
            marginTop: 2,
          }}
        >
          {artisteName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Artiste;
