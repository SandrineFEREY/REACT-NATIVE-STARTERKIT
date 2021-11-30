import React from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import axios from "axios";

export default function ProfileScreen() {
  const { params } = useRoute();
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView>
        <View style={styles.photoTitle}>
          <Text>Photo</Text>
          {/* <Image
            style={styles.photoUser}
            source={{ uri: data.user.account.url }}
          /> */}
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="email"
            type="email"
            // value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="username"
            type="username"
            // value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <TextInput
            style={styles.inputDescription}
            placeholder="Describe yourself in a few words..."
            type="description"
            // value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
          <View style={styles.btns}>
            <TouchableOpacity>
              <Text style={styles.btn}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.btn}>Log out</Text>
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

  photoTitle: {
    alignItems: "center",
    marginBottom: 40,
    borderWidth: 2,
    borderColor: "red",
  },

  photoUser: {
    height: 80,
    width: 80,
    borderRadius: 50,
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

  btns: {
    marginTop: 40,

    alignItems: "center",
  },

  btn: {
    borderWidth: 2,
    borderColor: "red",
    height: 50,
    width: 200,
    // alignItems: "center",
    // justifyContent: "center",
    textAlign: "center",
    padding: 10,
    borderRadius: 30,
    marginBottom: 40,
  },

  account: {
    marginTop: 20,
  },

  error: {
    color: "red",
    marginBottom: 5,
  },
});
