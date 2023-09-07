import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Amenities from "../components/Amenities";
const RoomsScreen = () => {
  const route = useRoute();
  console.log(route.params);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Available Rooms",
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
      },
    });
  }, []);
  const [selected, setSelected] = useState([]);
  return (
    <>
      <ScrollView>
        {route.params.rooms.map((item, index) => (
          <Pressable
            style={styles.roomContainer}
            key={index}
          >
            <View style={styles.roomInfo}>
              <Text style={styles.roomName}>{item.name}</Text>
              <AntDesign name="infocirlceo" size={24} color="#007FFF" />
            </View>
            <Text style={styles.paymentInfo}>pay at the property</Text>
            <Text style={styles.cancellationInfo}>Free cancellation Available</Text>
            <View style={styles.priceInfo}>
              <Text style={styles.oldPrice}>
                {route.params.oldPrice}
              </Text>
              <Text style={styles.newPrice}>${route.params.newPrice}</Text>
            </View>
            <Amenities />

            {selected.includes(item.name) ? (
              <Pressable
                style={styles.selectedButton}
              >
                <Text style={styles.selectedButtonText}>SELECTED</Text>
                <Entypo
                  onPress={() => setSelected([])}
                  name="circle-with-cross"
                  size={24}
                  color="red"
                />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => setSelected(item.name)}
                style={styles.selectButton}
              >
                <Text style={styles.selectButtonText}>SELECT</Text>
              </Pressable>
            )}
          </Pressable>
        ))}
      </ScrollView>

      {selected.length > 0 ? (
        <Pressable
          onPress={() =>
            navigation.navigate("User", {
              oldPrice: route.params.oldPrice,
              newPrice: route.params.newPrice,
              name: route.params.name,
              children: route.params.children,
              adults: route.params.adults,
              rating: route.params.rating,
              startDate: route.params.startDate,
              endDate: route.params.endDate,
            })
          }
          style={styles.reserveButton}
        >
          <Text style={styles.reserveButtonText}>Reserve</Text>
        </Pressable>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
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
  roomContainer: {
    margin: 10,
    backgroundColor: "white",
    padding: 10,
  },
  roomInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  roomName: {
    color: "#007FFF",
    fontSize: 17,
    fontWeight: "500",
  },
  paymentInfo: {
    marginTop: 3,
    fontSize: 16,
  },
  cancellationInfo: {
    marginTop: 3,
    color: "green",
    fontSize: 16,
  },
  priceInfo: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  oldPrice: {
    color: "red",
    fontSize: 18,
    textDecorationLine: "line-through",
  },
  newPrice: {
    fontSize: 18,
  },
  selectedButton: {
    borderColor: "#318CE7",
    backgroundColor: "#F0F8FF",
    borderWidth: 2,
    width: "100%",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedButtonText: {
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    color: "#318CE7",
    fontWeight: "bold",
    fontSize: 16,
  },
  selectButton: {
    borderColor: "#007FFF",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },
  selectButtonText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#007FFF",
  },
  reserveButton: {
    backgroundColor: "#007FFF",
    padding: 8,
    marginBottom: 30,
    borderRadius: 3,
    marginHorizontal: 15,
  },
  reserveButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default RoomsScreen;
