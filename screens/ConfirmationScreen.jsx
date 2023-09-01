import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
// import { savedPlaces } from "../SavedReducer";
import { auth } from "../Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";


const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // const dispatch = useDispatch();
  const uid = auth.currentUser.uid;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Final Details",
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
        bookings: updatedBookings
      },
      { merge: true }
    );
    navigation.navigate("Main");
  };

  return (
    <View>
      <Pressable style={{ backgroundColor: "white", margin: 10 }}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            {route.params.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginTop: 7,
            }}
          >
            <MaterialIcons name="stars" size={24} color="green" />
            <Text>{route.params.rating}</Text>
            <View
              style={{
                backgroundColor: "#003580",
                paddingVertical: 3,
                borderRadius: 5,
                width: 100,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 15,
                }}
              >
                Genius Level
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            margin: 12,
            flexDirection: "row",
            alignItems: "center",
            gap: 60,
          }}
        >
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}>
              Check In
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#007FFF" }}
            >
              {route.params.startDate}
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}>
              Check Out
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#007FFF" }}
            >
              {route.params.endDate}
            </Text>
          </View>
        </View>
        <View style={{ margin: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 3 }}>
            Rooms and Guests
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#007FFF" }}>
            {route.params.rooms} rooms {route.params.adults} adults{" "}
            {route.params.children} children
          </Text>
        </View>
        <Pressable
          onPress={confirmBooking}
          style={{
            backgroundColor: "#003580",
            width: 120,
            padding: 5,
            marginHorizontal: 12,
            marginBottom: 20,
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Book Now
          </Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
