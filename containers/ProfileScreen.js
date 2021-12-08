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
import * as ImagePicker from "expo-image-picker";
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
        console.log("tom");
      } catch (error) {
        console.log(error.response);
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
    const userToken = await AsyncStorage.getItem("userToken");

    // console.log(userToken);

    try {
      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/update",

        {
          email: email,
          username: username,
          description: description,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  // ajouter ou modifier la photo (image) de profile de l'ulisateur avec cette route : https://express-airbnb-api.herokuapp.com/user/upload_picture

  const [upLoading, setUpLoading] = useState(false);

  const handleImagePicked = async (picture) => {
    setUpLoading(true);
    const userToken = await AsyncStorage.getItem("userToken");
    const tab = picture.uri.split(".");
    const formData = new FormData();
    formData.append("photo", {
      uri: picture.uri,
      name: `photo.${tab[1]}`,
      type: `image/${tab[1]}`,
    });

    try {
      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/upload_picture",
        formData,

        {
          headers: {
            authorization: `Bearer ${userToken}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setData(response.data);
      setUpLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading || upLoading ? (
    <ActivityIndicator
      size="large"
      color="purple"
      style={{ flex: 1, marginTop: 20 }}
    />
  ) : (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView>
        <View style={styles.images}>
          <View style={styles.photoTitle}>
            {/* // pas de photo pour l'instant pour ce username sandrine que j'ai crée en m'inscrivant dans signup, juste un emplacement disponible pour qu'elle s'affiche, ici un rond rouge*/}
            {/* <Image style={styles.photoUser} source={{ uri: data.photo }} /> */}
            {data.photo.url ? (
              <Image
                style={styles.photoUser}
                source={{ uri: data.photo.url }}
              />
            ) : (
              <Ionicons style={styles.iconPerso} name={"person-outline"} />
            )}
            {/* <Image une image avatar standard /> */}
          </View>
          <View style={styles.icons}>
            <Ionicons
              style={styles.iconImages}
              name={"images"}
              onPress={async () => {
                const cameraRollPerm =
                  await ImagePicker.requestMediaLibraryPermissionsAsync();

                if (cameraRollPerm.status === "granted") {
                  const pickerResult =
                    await ImagePicker.launchImageLibraryAsync({
                      allowsEditing: true,
                      aspect: [4, 3],
                    });
                  console.log(pickerResult);
                  handleImagePicked(pickerResult);
                }
              }}
            ></Ionicons>
            <Ionicons style={styles.iconCamera} name={"camera"}></Ionicons>
          </View>
        </View>

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

  images: {
    flexDirection: "row",
    justifyContent: "center",
  },

  photoTitle: {
    alignItems: "center",
    marginBottom: 40,
  },

  photoUser: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 50,
  },

  iconPerso: {
    fontSize: 60,
    textAlign: "center",

    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 50,
  },
  icons: {
    marginLeft: 20,
    justifyContent: "space-around",
    marginBottom: 40,
  },

  iconImages: {
    fontSize: 25,
  },

  iconCamera: {
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
