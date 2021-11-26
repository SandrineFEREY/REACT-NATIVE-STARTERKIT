import React from "react";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import Constants from "expo-constants";
import axios from "axios";

const RoomScreen = ({ route }) => {
  console.log(route.params.id);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View>
        <Text>Text</Text>
        <ImageBackground
          style={styles.bgImage}
          source={{ uri: data.photos[0].url }}
        >
          <Text style={styles.price}>{data.price}</Text>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,

    paddingTop: 10,
    paddingHorizontal: 30,
  },

  bgImage: {
    height: 200,
    marginBottom: 20,
    justifyContent: "flex-end",
  },

  price: {
    color: "white",
    backgroundColor: "black",
    width: 100,
    height: 50,
    // justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    marginBottom: 20,
  },

  titleUser: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
  },

  photoUser: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
});
