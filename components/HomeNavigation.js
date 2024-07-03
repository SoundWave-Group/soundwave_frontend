import { View, StyleSheet } from "react-native";
import ColoredButton from "./ColoredButton";

const HomeNavigation = ({ activeRouteName }) => {
  return (
    <View style={styles.topNavigation}>
      <ColoredButton
        name="Genre"
        color={activeRouteName === "MainScreen" ? "green" : "lightgreen"}
        link="HomeScreen"
      />
      <ColoredButton
        name="New Music"
        color={activeRouteName === "NewMusic" ? "green" : "lightgreen"}
        link="NewMusic"
      />
      <ColoredButton
        name="Trending"
        color={activeRouteName === "Trending" ? "green" : "lightgreen"}
        link="Trending"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topNavigation: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: "auto",
    paddingLeft: 10,
    marginTop: 20,
  },
});

export default HomeNavigation;
