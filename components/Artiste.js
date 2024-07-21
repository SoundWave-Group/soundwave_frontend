import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const Artiste = ({ artisteName, image }) => {
  return (
    <View style={{ marginHorizontal: 5 }}>
      <View style={{ alignItems: "center" }}>
        <Image source={image} style={styles.imageBox} />

        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "500",
            marginTop: 5,
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
