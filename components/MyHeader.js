import React, { Component } from "react";
import { Header, Icon, Badge } from "react-native-elements";
import { View, Text, StyeSheet, Alert, Image } from "react-native";
import db from "../config";
import firebase from "firebase";

const logo = require("../assets/panther.png");

export default class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  render() {
    return (
      <Header
        leftComponent={
          <Icon
            name="bars"
            type="font-awesome"
            color="#ffffff"
            onPress={(props) => this.props.navigation.toggleDrawer()}
          />
        }
        centerComponent={
          ((<Image source={logo} style={{ width: 20, height: 20 }}></Image>),
          (
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#D83E64" }}>
              {this.props.title}
            </Text>
          ))
        }
        backgroundColor="#D0D0D0"
      />
    );
  }
}
