import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Easing,
  Animated,
  Pressable,
  Alert,
} from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";

const ShazamScreen = () => {
  const scale = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  return (
    <View style={styles.container}>
      <TapGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            startAnimation();
          }
        }}
      >
        <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
          <View style={styles.shazamOuterContainer}>
            <View style={styles.shazamInnerContainer}>
              <Pressable
                onPress={() => {
                  startAnimation();
                  Alert.alert("SHAZAM !");
                }}
              >
                <Ionicons name="musical-notes" size={70} color="white" />
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </TapGestureHandler>
      <Text style={{ fontSize: 18, marginTop: 40, color: "green" }}>
        Tap to Identify A Song
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  shazamOuterContainer: {
    borderWidth: 2,
    borderColor: "lightgreen",
    borderRadius: 200,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgreen",
  },
  shazamInnerContainer: {
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 100,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
});

export default ShazamScreen;
