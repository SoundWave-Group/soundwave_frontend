import { View, StyleSheet, SafeAreaView } from "react-native";
import ColoredButton from "./ColoredButton";

const HomeNavigation = ({ activeRouteName }) => {
  return (
    <SafeAreaView style={styles.topNavigation}>
      <View style={{ marginLeft: 10, flexDirection: "row" }}>
        <ColoredButton
          name="Home"
          color={activeRouteName === "MainScreen" ? "#0C5745" : "#CCEAE3"}
          link="Home"
          textColor={activeRouteName === "MainScreen" ? "black" : "white"}
        />
        <ColoredButton
          name="New Music"
          color={activeRouteName === "NewMusic" ? "#0C5745" : "#CCEAE3"}
          link="NewMusic"
          textColor={activeRouteName === "NewMusic" ? "black" : "white"}
        />
        <ColoredButton
          name="Trending"
          color={activeRouteName === "Trending" ? "#0C5745" : "#CCEAE3"}
          textColor={activeRouteName === "Trending" ? "black" : "white"}
          link="Trending"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topNavigation: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    marginBottom: "auto",
  },
});

export default HomeNavigation;
