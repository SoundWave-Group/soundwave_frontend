import { View, Text, Image, StyleSheet } from "react-native";

const placeholderArtiste = require("../assets/singer4.jpg");

const Artiste = ({ name, image = { placeholderArtiste } }) => {
  return (
    <View style={{ marginHorizontal: 5 }}>
      <View style={{ alignItems: "center" }}>
        <Image source={image} style={styles.imageBox} />
        <Text
          style={{
            color: "green",
          }}
        >
          {name}
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
