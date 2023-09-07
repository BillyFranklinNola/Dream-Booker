import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Amenities = () => {
  const services = [
    {
      id: "0",
      name: "room service",
    },
    {
      id: "2",
      name: "free wifi",
    },
    {
      id: "3",
      name: "Family rooms",
    },
    {
      id: "4",
      name: "Free Parking",
    },
    {
      id: "5",
      name: "swimming pool",
    },
    {
      id: "6",
      name: "Restaurant",
    },
    {
      id: "7",
      name: "Fitness center",
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Most Popular Facilities</Text>
      <View style={styles.servicesContainer}>
        {services.map((item, index) => (
          <View
            style={styles.serviceItem}
            key={index}
          >
            <Text style={styles.serviceText}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Amenities;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
  },
  servicesContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  serviceItem: {
    margin: 10,
    backgroundColor: "#007FFF",
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 25,
  },
  serviceText: {
    textAlign: "center",
    color: "white",
  },
});