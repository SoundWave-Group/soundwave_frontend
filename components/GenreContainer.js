import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";

const genreImage = require("../assets/adaptive-icon.png");

const GenreContainer = ({ name, image = genreImage, color = "lightgreen" }) => {
  return (
    <View
      style={[
        styles.genreContainer,
        { flexDirection: "row", backgroundColor: `${color}` },
      ]}
    >
      <Text style={{ fontSize: 20 }}>{name}</Text>
      <Image
        source={image}
        style={{
          height: 40,
          width: 40,
          justifyContent: "center",
          marginLeft: "auto",
        }}
        alt="Genre"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  genreContainer: {
    flex: 0,
    width: "45%",
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    padding: 10,
    borderRadius: 10,
  },
});

export default GenreContainer;
