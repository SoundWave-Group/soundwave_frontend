import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";

const genreImage = require("../assets/pop.jpg");

const GenreContainer = ({ name, image = genreImage }) => {
  return (
    <View style={[styles.genreContainer, { flexDirection: "row" }]}>
      <Text
        style={{ fontSize: 20, color: "white", marginLeft: 30, marginTop: 10 }}
      >
        {name}
      </Text>
      <Image
        source={image}
        style={{
          height: 150,
          width: 150,
          justifyContent: "center",
          marginLeft: "auto",
          borderRadius: 8,
          zIndex: -1,
        }}
        alt="Genre"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  genreContainer: {
    width: "45%",
    marginTop: 10,
    marginRight: 5,
  },
});

export default GenreContainer;
