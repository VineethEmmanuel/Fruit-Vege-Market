import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import Text from "./Text";

function Card({ title, subTitle, imageUrl, rating, show }) {
  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          borderRadius: 15,
          backgroundColor: colors.white,
          marginBottom: 20,
          overflow: "hidden",
        }}
      >
        <Image style={styles.image} tint="light" uri={imageUrl} />
        {show === true ? (
          <View
            style={{
              marginVertical: -70,
              width: 55,
              padding: 10,
              marginBottom: 50,
              paddingTop: -7,
              paddingBottom: -7,
              borderRadius: 10,
              backgroundColor: "tomato",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Alert for Deleting",
                  "Do You Really Want to Delete this Property?",
                  [
                    {
                      text: "No",
                      style: "cancel",
                    },
                    { text: "Yes", onPress: () => handleDelete() },
                  ],
                  { cancelable: false }
                )
              }
            >
              <MaterialIcons
                name="delete"
                size={32}
                color={colors.goBackButton}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.detailsContainer}>
          <Text style={{ marginBottom: 7, color: "black" }} numberOfLines={1}>
            {title}
          </Text>
          <View style={{ display: "flex" }}>
            <Text style={styles.subTitle} numberOfLines={2}>
              ₹ {subTitle}
            </Text>
          </View>
          <View
            style={{
              marginVertical: -117,
              alignSelf: "flex-end",
              padding: 10,
              marginBottom: 90,
              paddingTop: -7,
              paddingBottom: -7,
              borderRadius: 10,
              backgroundColor: "cyan",
            }}
          >
            <Text style={styles.category}>{rating}/5</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
    marginBottom: -10,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  category: {
    alignSelf: "flex-end",
    marginBottom: 1,
    fontSize: 18,
    color: colors.black,
  },
});

export default Card;
