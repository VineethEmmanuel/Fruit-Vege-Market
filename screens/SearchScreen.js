import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, RefreshControl } from "react-native";
import db from "../config.js";
import MyHeader from "../components/MyHeader";
import Card from "../components/Card";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import Screen from "../components/Screen.js";
import colors from "../config/colors.js";
import firebase from "firebase";

export default function SearchScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const productsRef = db.collection("products");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setIsLoading(true);

    const snapshot = await productsRef.orderBy("id").get();

    if (!snapshot.empty) {
      let newProducts = [];

      for (let i = 0; i < snapshot.docs.length; i++) {
        newProducts.push(snapshot.docs[i].data());
      }

      setProducts(newProducts);
    }

    setIsLoading(false);
  };

  const onRefresh = () => {
    getProducts();
  };

  const handleDelete = () => {
    db.collection("Properties")
      .doc(listing.propertyId)
      .delete()
      .then(() => {
        Alert.alert(
          "Success",
          "The Property You have selected has been Deleted Successfully",
          [
            {
              text: "OK",
              onPress: () => {
                db.collection("Properties")
                  .doc("mainId")
                  .get()
                  .then((doc) => {
                    setMainId(doc.data().mainId - 1);
                    db.collection("Properties")
                      .doc("mainId")
                      .set({
                        mainId: mainId,
                      })
                      .then(() => {
                        console.log("Document successfully written!");
                      })
                      .catch((error) => {
                        console.error("Error writing document: ", error);
                      });
                  });
              },
            },
          ],
          { cancelable: false }
        );
      });
  };

  return (
    <>
      <MyHeader title="Search" navigation={navigation} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Popular Products</Text>
          <ScrollView>
            {products.map((item) => (
              <Screen style={{ padding: 10, backgroundColor: colors.light }}>
                <Card
                  title={item.name}
                  imageUrl={item.photo}
                  subTitle={item.price}
                  rating={item.rating}
                  show={
                    item.ownerId === firebase.auth().currentUser.uid
                      ? true
                      : false
                  }
                />
              </Screen>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    paddingTop: 20,
  },
  headerLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginLeft: 5,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#D83E64",
  },
  title: {
    fontWeight: "300",
    fontSize: 26,
    marginVertical: 10,
    marginLeft: 10,
    color: "#333333",
  },
  list: {
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  listImage: {
    width: "100%",
    height: 200,
  },
  listingRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  name: {
    fontWeight: "500",
    fontSize: 17,
    color: "#333333",
  },
  rating: {
    fontSize: 13,
    fontWeight: "100",
    color: "#333333",
  },
  budgetTagsContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  budgetTagsText: {
    fontWeight: "100",
    color: "#333333",
    fontSize: 15,
  },
  newContainer: {
    position: "absolute",
    top: 20,
    left: 10,
    backgroundColor: "#D83E64",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  newText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
});
