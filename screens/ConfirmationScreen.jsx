import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
// import { savedPlaces } from "../SavedReducer";
import { auth } from "../Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // const dispatch = useDispatch();
  const uid = auth.currentUser.uid;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Confirm Details",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 140,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);

  const confirmBooking = async () => {
    // dispatch(savedPlaces(route.params));
    const userRef = doc(db, "users", `${uid}`);
    const userData = await getDoc(userRef);
    const user = userData.data() || {};
    const updatedBookings = user.bookings || [];

    console.log(route.params);

    updatedBookings.push(route.params);

    await setDoc(
      userRef,
      {
        bookings: updatedBookings,
      },
      { merge: true }
    );
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.card}>
        <View>
          <Text style={styles.propertyName}>{route.params.name}</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="stars" size={24} color="green" />
            <Text>{route.params.rating}</Text>
            <View style={styles.geniusLevel}>
              <Text style={styles.geniusLevelText}>Genius Level</Text>
            </View>
          </View>
        </View>
        <View style={styles.dateContainer}>
          <View style={styles.dateDetails}>
            <Text style={styles.dateLabel}>Check In</Text>
            <Text style={styles.dateValue}>{route.params.startDate}</Text>
          </View>
          <View style={styles.dateDetails}>
            <Text style={styles.dateLabel}>Check Out</Text>
            <Text style={styles.dateValue}>{route.params.endDate}</Text>
          </View>
        </View>
        <View style={styles.roomsContainer}>
          <Text style={styles.roomsLabel}>Rooms and Guests</Text>
          <Text style={styles.roomsValue}>
            {route.params.rooms} rooms {route.params.adults} adults{" "}
            {route.params.children} children
          </Text>
        </View>
      </Pressable>
      <Pressable
        onPress={confirmBooking}
        style={styles.bookNowButton}
      >
        <Text style={styles.bookNowText}>Book Now</Text>
      </Pressable>
    </View>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: "white",
    margin: 10,
  },
  propertyName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 7,
  },
  geniusLevel: {
    backgroundColor: "#003580",
    paddingVertical: 3,
    borderRadius: 5,
    width: 100,
  },
  geniusLevelText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
  dateContainer: {
    margin: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 60,
  },
  dateDetails: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 3,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007FFF",
  },
  roomsContainer: {
    margin: 12,
  },
  roomsLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 3,
  },
  roomsValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007FFF",
  },
  bookNowButton: {
    backgroundColor: "#003580",
    width: 160,
    padding: 5,
    marginHorizontal: 12,
    marginBottom: 20,
    borderRadius: 4,
    alignSelf: "center",
  },
  bookNowText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
