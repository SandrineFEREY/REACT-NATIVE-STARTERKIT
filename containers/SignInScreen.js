import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { useState } from "react";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Button,
  Text,
  Image,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";

import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setToken(response.data.token, response.data._id);
      }
    } catch (error) {
      // console.log(error.response);
      console.log(error.message);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView>
        <View style={styles.logoTitle}>
          <Image
            style={styles.logo}
            rezideMode="contain"
            source={require("../assets/images/Airbnb-logo.jpg")}
          />
          <Text style={styles.signin}>Sign in</Text>
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder="email"
            type="email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            type="password"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>

        <View style={styles.signinCreate}>
          <Button title="Sign in" type="submit" onPress={handleSubmit} />
          <TouchableOpacity
            style={styles.account}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>No account ? Register</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          </TouchableOpacity>
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

    padding: 40,
  },

  logoTitle: {
    alignItems: "center",
    marginBottom: 60,
  },

  logo: {
    height: 100,
    width: 100,
    marginBottom: 30,
  },

  signin: {
    fontWeight: "bold",
    fontSize: 25,
  },

  input: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: "red",
  },

  signinCreate: {
    marginTop: 80,
    alignItems: "center",
  },

  account: {
    marginTop: 20,
  },

  errorMessage: {
    color: "red",
  },
});
