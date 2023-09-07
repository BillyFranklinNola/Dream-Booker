import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Ionicons name="bed-outline" size={20} color="white" />
        <Text style={styles.buttonText}>Stays</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Ionicons name="airplane-outline" size={20} color="white" />
        <Text style={styles.buttonText}>Flights</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <AntDesign name="car" size={20} color="white" />
        <Text style={styles.buttonText}>Car Rental</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <FontAwesome5 name="uber" size={20} color="white" />
        <Text style={styles.buttonText}>Taxi</Text>
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#003580",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 25,
    padding: 6,
  },
  buttonText: {
    marginLeft: 8,
    fontWeight: "bold",
    color: "white",
    fontSize: 13,
  },
});
