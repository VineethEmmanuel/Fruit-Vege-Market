import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MyHeader from "../components/MyHeader";

export default class OrderScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="MyOrders" navigation={this.props.navigation} />
        <Text>Hello this is Orders Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
