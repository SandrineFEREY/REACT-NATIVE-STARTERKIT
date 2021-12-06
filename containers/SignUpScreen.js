import { useState } from "react";
import React from "react";

import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import axios from "axios";

export default function SignUpScreen({ setToken, navigation }) {
  const [email, setEmail] = useState(""); //Ben.fe@free.fr // Ben.san@free.fr
  const [username, setUsername] = useState(""); // Ben     // Ben4
  const [description, setDescription] = useState(""); // Test33334
  const [password, setPassword] = useState(""); // Testappli2 // Test3appli
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (email && username && description && password && confirmPassword) {
      setError("");

      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          console.log(response.data);
          setToken(response.data.token, response.data.id);
        } catch (error) {
          console.log(error.response.status);
          console.log(error.response.data);
        }
      } else {
        setError("Les 2 mots de passe ne sont pas identiques");
      }
    } else {
      setError("Remplir tous les champs");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView>
        <View style={styles.logoTitle}>
          <Image
            style={styles.logo}
            source={require("../assets/images/Airbnb-logo.jpg")}
          />
          <Text style={styles.signup}>Sign up </Text>
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
            placeholder="username"
            type="username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <TextInput
            style={styles.inputDescription}
            placeholder="Describe yourself in a few words..."
            type="description"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            type="password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="confirm password"
            type="confirmPassword"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
          />
          <View style={styles.signupAccount}>
            {/* <Button title="Sign up" type="submit" /> */}
            <Text style={styles.error}>{error}</Text>
            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.account}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text>Already have an account ? Sing in</Text>
            </TouchableOpacity>
          </View>
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
    height: 100,
    width: 100,
    marginBottom: 20,
  },

  signup: {
    fontWeight: "bold",
    fontSize: 25,
  },

  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "red",
    marginBottom: 20,
  },
  inputDescription: {
    height: 80,
    borderWidth: 1,
    borderColor: "red",
    textAlign: "center",
  },

  signupAccount: {
    marginTop: 40,
    alignItems: "center",
  },

  btn: {
    borderWidth: 2,
    borderColor: "red",
    height: 30,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },

  account: {
    marginTop: 20,
  },

  error: {
    color: "red",
    marginBottom: 5,
  },
});
