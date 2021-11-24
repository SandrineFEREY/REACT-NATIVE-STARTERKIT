import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View, Image, StyleSheet } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import Constants from "expo-constants";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView>
        <View style={styles.logoTitle}>
          <Image
            style={styles.logo}
            source={require("../assets/images/Airbnb-logo.jpg")}
          />
        </View>

        <View>
          <Text>Welcome home!</Text>
          <Button
            title="Go to Profile"
            onPress={() => {
              navigation.navigate("Profile", { userId: 123 });
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,

    paddingTop: 10,
    paddingHorizontal: 30,
  },

  logoTitle: {
    alignItems: "center",
    marginBottom: 10,
  },

  logo: {
    height: 50,
    width: 50,
    marginBottom: 20,
  },
});
