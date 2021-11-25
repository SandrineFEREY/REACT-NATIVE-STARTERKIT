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

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading === true ? (
    <ActivityIndicator
      size="large"
      color="purple"
      style={{ fex: 1, marginTop: 20 }}
    />
  ) : (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Room");
                }}
              >
                <ImageBackground
                  style={styles.bgImage}
                  source={{ uri: item.photos[0].url }}
                >
                  <View>
                    <Text style={styles.price}>{item.price}</Text>
                  </View>
                </ImageBackground>

                <View style={styles.titleUser}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Image
                    style={styles.photoUser}
                    source={{ uri: item.user.account.photo.url }}
                  ></Image>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <View></View>
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
