import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const ReservationDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Reservation Details",
      headerTitlePosition: "center",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const finalStep = () => {
    if (!firstName || !lastName || !email || !phoneNo) {
      Alert.alert(
        "Invalid Details",
        "Please enter all the fields",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    if (firstName && lastName && email && phoneNo) {
      navigation.navigate("Confirmations", {
        oldPrice: route.params.oldPrice,
        newPrice: route.params.newPrice,
        name: route.params.name,
        children: route.params.children,
        adults: route.params.adults,
        rating: route.params.rating,
        startDate: route.params.startDate,
        endDate: route.params.endDate,
      });
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        keyboardShouldPersistTaps: "handled",
      }}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            style={styles.input}
          />
        </View>

        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            style={styles.input}
          />
        </View>

        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
        </View>

        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <Text style={styles.label}>Phone no</Text>
          <TextInput
            value={phoneNo}
            onChangeText={(text) => setPhoneNo(text)}
            style={styles.input}
          />
        </View>
      </View>

      <Pressable style={styles.footer} onPress={finalStep}>
        <View style={styles.footerContent}>
          <View style={styles.priceInfo}>
            <View style={styles.priceRow}>
              <Text style={styles.oldPrice}>
                {route.params.oldPrice * route.params.adults}
              </Text>
              <Text style={styles.newPrice}>
                ${route.params.newPrice * route.params.adults}
              </Text>
            </View>
            <Text style={styles.savings}>
              You Saved {route.params.oldPrice - route.params.newPrice} dollars
            </Text>
          </View>
          <View style={styles.submitButton}>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </View>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: "column",
    gap: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  input: {
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  headerStyle: {
    backgroundColor: "#003580",
    height: 110,
    borderBottomColor: "transparent",
    shadowColor: "transparent",
  },
  footer: {
    backgroundColor: "white",
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  footerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  priceInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  oldPrice: {
    color: "red",
    fontSize: 20,
    textDecorationLine: "line-through",
  },
  newPrice: {
    fontSize: 20,
  },
  savings: {
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: "#007FFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
});

export default ReservationDetailsScreen;
