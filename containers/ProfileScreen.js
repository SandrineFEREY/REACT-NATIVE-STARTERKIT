import React from "react";
import { useRoute } from "@react-navigation/core";
import { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import axios from "axios";

export default function ProfileScreen({ setToken }) {
  // le setToken ici sert uniquement à la déconnexion

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // récupérer le token et l'id qui sont dans l'Asyncstorage (info sur App.js)
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log(response.data);
        //  ==> ce console.log est important pour récupérer les infos en objet dans le terminal (mail, mot de passe et description) crées à l'insciption
        setData(response.data); // ici les infos peuvent être affichés
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  //changer son adresse email, son nom et sa description :

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  //donc écrire une fonction qui fait une requête vers "https://express-airbnb-api.herokuapp.com/user/update" en put

  const updateProfile = async () => {
    // const userToken = await AsyncStorage.getItem("userToken");

    const response = await axios.put(
      "https://express-airbnb-api.herokuapp.com/user/update",

      {
        email: email,
        username: username,
        description: description,

        //   headers: {
        //     authorization: `Bearer ${userToken}`,
        //   },
      }
    );
    console.log(response.data);
  };
  return isLoading ? (
    <ActivityIndicator
      size="large"
      color="purple"
      style={{ flex: 1, marginTop: 20 }}
    />
  ) : (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView>
        <View style={styles.photoTitle}>
          <Image style={styles.photoUser} source={{ uri: data.photo }} />

          {/* {data.photo ? (
            <Image style={styles.photoUser} source={{ uri: data.photo }} />
          ) : (
            <Image une image avatar standard /> <i class="fal fa-user"></i>
          )} */}
        </View>
        {/* // pas de photo pour l'instant pour ce username sandrine que j'ai crée en m'inscrivant dans signup, juste un emplacement disponible pour qu'elle s'affiche, ici un rond rouge*/}

        {/* <Text>{data.email}</Text> */}
        <View>
          <TextInput
            style={styles.input}
            type="email"
            placeholder={data.email}
            // value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          {/* <Text>{data.username}</Text> */}
          <TextInput
            style={styles.input}
            placeholder={data.username}
            type="username"
            // value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          {/* <Text>{data.description}</Text> */}
          <TextInput
            style={styles.inputDescription}
            placeholder={data.description}
            type="description"
            value={description}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
        </View>

        <View style={styles.btns}>
          <TouchableOpacity onPress={updateProfile}>
            <Text style={styles.btn}>Update</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setToken(null, null)}>
            <Text style={styles.btn}>Log out</Text>
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

    paddingTop: 10,
    paddingHorizontal: 30,
  },

  photoTitle: {
    alignItems: "center",
    marginBottom: 40,
  },

  photoUser: {
    height: 80,
    width: 80,
    borderWidth: 1,
    borderColor: "red",
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
