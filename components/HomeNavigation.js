import { View, StyleSheet, SafeAreaView } from "react-native";
import ColoredButton from "./ColoredButton";

const HomeNavigation = ({ activeRouteName }) => {
  return (
    <SafeAreaView style={styles.topNavigation}>
      <View style={{ marginLeft: 10, flexDirection: "row" }}>
        <ColoredButton
          name="Genre"
          color={activeRouteName === "MainScreen" ? "#0C5745" : "#CCEAE3"}
          link="Home"
        />
        <ColoredButton
          name="New Music"
          color={activeRouteName === "NewMusic" ? "#0C5745" : "#CCEAE3"}
          link="NewMusic"
        />
        <ColoredButton
          name="Trending"
          color={activeRouteName === "Trending" ? "#0C5745" : "#CCEAE3"}
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
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderColor: "#CCEAE3",
  },
});

export default HomeNavigation;
