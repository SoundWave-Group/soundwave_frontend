import { Easing } from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";

const verticalSlideTransition = {
  gestureDirection: "vertical",
  transitionSpec: {
    open: {
      animation: "timing",
      config: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
      },
    },
    close: {
      animation: "timing",
      config: {
        duration: 300,
        easing: Easing.in(Easing.poly(4)),
      },
    },
  },
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};

module.exports = { verticalSlideTransition };
