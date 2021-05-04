import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Picker,
  ScrollView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppTextInput from "../components/TextInput";
import AppText from "../components/Text";
import AppButton from "../components/Button";
import db from "../config.js";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";

export default class CreateItem extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null,
      name: "",
      price: "",
      selectedCategory: null,
      selectedCategoryColor: null,
      id: null,
      imageUrl: null,
    };
  }

  selectPicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 3],
      allowsEditing: false,
    });

    if (!result.cancelled) {
      this.uploadImage(result.uri, this.state.name)
        .then(() => {
          console.log("Success");
          this.setState({ image: result.uri });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref("product-images/").child(imageName);
    return ref.put(blob).then(() => {
      ref.getDownloadURL().then((url) => {
        this.setState({ imageUrl: url });
      });
    });
  };

  handleSubmit = async () => {
    this.uploadImage();
    const userUid = firebase.auth().currentUser.uid;
    db.collection("Properties")
      .add({
        name: this.state.name,
        price: this.state.price,
        category:
          this.state.selectedCategory === null
            ? "Plot"
            : this.state.selectedCategory,
        categoryColor:
          this.state.selectedCategoryColor === null
            ? "#00a7ea"
            : this.state.selectedCategory,
        id: this.state.id,
        images: this.state.imageUrl,
        ownerUid: userUid,
      })
      .then(() => {
        db.collection("products").doc("mainId").update({
          mainId: this.state.id,
        });
      });
  };

  addId = async () => {
    db.collection("Properties")
      .doc("mainId")
      .get()
      .then((doc) => {
        console.log(doc.data().mainId);
        this.setState({ id: doc.data().mainId + 1 });
        console.log("done 1st phase", this.state.id);
      });
  };

  componentDidMount = () => {
    this.addId();
  };

  render() {
    return (
      <>
        <MyHeader title="Create Item" navigation={this.props.navigation} />
        <Screen
          style={Platform.OS === "ios" ? { padding: 30 } : { padding: 10 }}
        >
          <ScrollView>
            <TouchableOpacity onPress={this.selectPicture}>
              <View style={styles.imageContainer}>
                {!this.state.image && (
                  <MaterialCommunityIcons
                    color={colors.medium}
                    name="camera"
                    size={40}
                  />
                )}
                {this.state.image && (
                  <Image
                    source={{ uri: this.state.image }}
                    style={styles.image}
                  />
                )}
              </View>
            </TouchableOpacity>
            <View>
              <AppTextInput
                placeholder="Name"
                onChangeText={(name) => this.setState({ name: name })}
                maxLength={30}
              />
              <AppTextInput
                placeholder="Price"
                onChangeText={(price) => this.setState({ price: price })}
                keyboardType="numeric"
                maxLength={10}
              />
              <AppText>Property Category</AppText>
              <Picker
                itemStyle={styles.pickerItem}
                selectedValue={this.state.selectedCategory}
                onValueChange={(itemValue) =>
                  this.setState({ selectedCategory: itemValue })
                }
              >
                <Picker.Item label="Fruit" value="Plot" color="red" />
                <Picker.Item label="Vegetable" value="Flat" color="orange" />
              </Picker>
            </View>
            <AppButton title="Post" onPress={this.handleSubmit} />
          </ScrollView>
        </Screen>
      </>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 100,
    backgroundColor: "lightgray",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
