import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { pixelNormalize } from "../components/Normalize";
import { MaterialIcons } from "@expo/vector-icons";
import Amenities from "../components/Amenities";

const PropertyInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `${route.params.name}`,
      headerTitleAlign: "center",
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
        textAlign: "center",
      },
    });
  }, []);

  const difference = route.params.oldPrice - route.params.newPrice;
  const offerPrice = (Math.abs(difference) / route.params.oldPrice) * 100;
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Pressable style={styles.imageContainer}>
            {route.params.photos.slice(0, 5).map((photo, index) => (
              <View style={styles.imageWrapper} key={index} onError={(error) => console.error("Image loading error:", error)}>
                <Image
                  style={styles.propertyImage}
                  source={{ uri: photo.image }}
                  key={index}
                />
              </View>
            ))}
            <Pressable style={styles.showMoreButton}>
              <Text style={styles.showMoreText}>Show More</Text>
            </Pressable>
          </Pressable>

          <View style={styles.propertyInfo}>
            <View>
              <Text style={styles.propertyName}>{route.params.name}</Text>
              <View style={styles.ratingContainer}>
                <MaterialIcons name="stars" size={24} color="green" />
                <Text style={styles.ratingText}>{route.params.rating}</Text>
                <View style={styles.geniusLevel}>
                  <Text style={styles.geniusLevelText}>Genius Level</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.separator} />

          <Text style={styles.priceInfo}>Price for 1 Night and {route.params.adults} adults</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.oldPrice}>${route.params.oldPrice * route.params.adults}</Text>
            <Text style={styles.newPrice}>${route.params.newPrice * route.params.adults}</Text>
            <View style={styles.discountContainer}>
              <Text style={styles.discountText}>{offerPrice.toFixed(0)} % OFF</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.checkInOutContainer}>
            <View style={styles.checkInOut}>
              <Text style={styles.checkInOutLabel}>Check In</Text>
              <Text style={styles.checkInOutValue}>{route.params.selectedDates.startDate}</Text>
            </View>
            <View style={styles.checkInOut}>
              <Text style={styles.checkInOutLabel}>Check Out</Text>
              <Text style={styles.checkInOutValue}>{route.params.selectedDates.endDate}</Text>
            </View>
          </View>

          <View style={styles.roomsAndGuests}>
            <Text style={styles.roomsAndGuestsLabel}>Rooms and Guests</Text>
            <Text style={styles.roomsAndGuestsValue}>
              {route.params.rooms} rooms {route.params.adults} adults {route.params.children} children
            </Text>
          </View>

          <View style={styles.separator} />

          <Amenities />

          <View style={styles.separator} />
        </ScrollView>
      </SafeAreaView>

      <Pressable
        onPress={() =>
          navigation.navigate("Rooms", {
            rooms: route.params.availableRooms,
            oldPrice: route.params.oldPrice,
            newPrice: route.params.newPrice,
            name: route.params.name,
            children: route.params.children,
            adults: route.params.adults,
            rating: route.params.rating,
            startDate: route.params.selectedDates.startDate,
            endDate: route.params.selectedDates.endDate,
          })
        }
        style={styles.availabilityButton}
      >
        <Text style={styles.availabilityButtonText}>See Availability</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
  },
  imageWrapper: {
    margin: 6,
  },
  propertyImage: {
    width: 120,
    height: pixelNormalize(80),
    borderRadius: pixelNormalize(4),
  },
  showMoreButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  showMoreText: {
    textAlign: "center",
    marginLeft: 20,
  },
  propertyInfo: {
    marginHorizontal: 12,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  ratingText: {
    fontSize: 16,
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
  separator: {
    borderColor: "#E0E0E0",
    borderWidth: 3,
    height: 1,
    marginTop: 15,
  },
  priceInfo: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "500",
    marginHorizontal: 12,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
    marginTop: 4,
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
  discountContainer: {
    marginHorizontal: 12,
    marginTop: 7,
    backgroundColor: "green",
    paddingHorizontal: 4,
    paddingVertical: 5,
    width: 78,
    borderRadius: 4,
  },
  discountText: {
    textAlign: "center",
    color: "white",
  },
  checkInOutContainer: {
    margin: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 60,
  },
  checkInOut: {
    flex: 1,
  },
  checkInOutLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 3,
  },
  checkInOutValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007FFF",
  },
  roomsAndGuests: {
    margin: 12,
  },
  roomsAndGuestsLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 3,
  },
  roomsAndGuestsValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007FFF",
  },
  availabilityButton: {
    backgroundColor: "#6CB4EE",
    position: "absolute",
    bottom: 0,
    padding: 15,
    width: "95%",
    marginHorizontal: 10,
  },
  availabilityButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default PropertyInfoScreen;
