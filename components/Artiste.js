import { View, Text, Image, StyleSheet } from "react-native";

const Artiste = ({ name, image }) => {
  return (
    <View style={{ marginHorizontal: 5 }}>
      <View style={{ alignItems: "center" }}>
        <Image source={image} style={styles.imageBox} />
        <Text
          style={{
            color: "green",
            fontSize: 16,
            marginTop: 2,
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
