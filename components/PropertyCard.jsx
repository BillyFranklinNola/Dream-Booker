import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PropertyCard = ({
  rooms,
  children,
  property,
  adults,
  selectedDates,
  availableRooms,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          navigation.navigate("Info", {
            name: property.name,
            rating: property.rating,
            oldPrice: property.oldPrice,
            newPrice: property.newPrice,
            photos: property.photos,
            availableRooms: property.rooms,
            adults: adults,
            children: children,
            rooms: rooms,
            selectedDates: selectedDates,
          })
        }
        style={styles.card}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: property.image }}
          />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.header}>
            <Text style={styles.propertyName}>{property.name}</Text>
            <AntDesign name="hearto" size={24} color="red" />
          </View>
          <View style={styles.rating}>
            <MaterialIcons name="stars" size={24} color="green" />
            <Text>{property.rating}</Text>
            <View style={styles.geniusLevel}>
              <Text style={styles.geniusLevelText}>Genius Level</Text>
            </View>
          </View>
          <Text style={styles.address}>
            {property.address.length > 50
              ? property.address.substr(0, 50)
              : property.address}
          </Text>
          <Text style={styles.price}>
            Price for 1 Night and {adults} adults
          </Text>
          <View style={styles.priceDetails}>
            <Text style={styles.oldPrice}>
              {property.oldPrice * adults}
            </Text>
            <Text style={styles.newPrice}>
              ${property.newPrice * adults}
            </Text>
          </View>
          <View style={styles.roomInfo}>
            <Text style={styles.roomType}>Deluxe Room</Text>
            <Text style={styles.bedInfo}>Hotel Room : 1 bed</Text>
          </View>
          <View style={styles.deal}>
            <Text style={styles.dealText}>Limited Time deal</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default PropertyCard;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    backgroundColor: "white",
  },
  card: {
    flexDirection: "row",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    height: Dimensions.get("window").height / 4,
    width: Dimensions.get("window").width - 280,
  },
  textContainer: {
    flex: 2,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  propertyName: {
    width: 200,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 7,
  },
  geniusLevel: {
    backgroundColor: "#6CB4EE",
    paddingVertical: 3,
    borderRadius: 5,
    width: 100,
  },
  geniusLevelText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
  address: {
    width: 210,
    marginTop: 6,
    color: "gray",
    fontWeight: "bold",
  },
  price: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "500",
  },
  priceDetails: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  oldPrice: {
    color: "red",
    fontSize: 18,
    textDecorationLine: "line-through",
  },
  newPrice: {
    fontSize: 18,
  },
  roomInfo: {
    marginTop: 6,
  },
  roomType: {
    fontSize: 16,
    color: "gray",
  },
  bedInfo: {
    fontSize: 16,
    color: "gray",
  },
  deal: {
    backgroundColor: "#6082B6",
    paddingVertical: 2,
    marginTop: 2,
    borderRadius: 5,
    width: 150,
    paddingHorizontal: 3,
  },
  dealText: {
    textAlign: "center",
    color: "white",
  },
});
