import { StyleSheet, Text, View ,SafeAreaView,Pressable} from 'react-native'
import React ,{useLayoutEffect, useEffect, useState} from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import {collection, query, where, getDocs} from 'firebase/firestore';
import { db } from '../Firebase';

const UpcomingTripsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Upcoming Trips",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 120,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const q = query(collection(db, "users"), where("bookings", "!=", []));
        const data = await getDocs(q);
        const userData = data.docs[0].data();
        setBookings(userData.bookings);
      } catch (error) {
        console.log(error);
      }
    };
    getBookings();
  }, []);

  return (
    <SafeAreaView>
          {bookings.length > 0 && bookings.map((item, index) => (
        <Pressable
          style={{
            backgroundColor: "white",
            marginVertical:10,
            marginHorizontal:20,
            borderColor: "#E0E0E0",
            borderWidth: 1,
            padding: 14,
            borderRadius: 6,
          }}
          key={index}
        >
          <View>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 7,
              }}
            >
              <MaterialIcons name="stars" size={24} color="green" />
              <Text style={{ marginLeft: 3, fontSize: 15, fontWeight: "400" }}>
                {item.rating}
              </Text>
              <Text style={{ marginLeft: 3 }}>•</Text>
              <View
                style={{
                  padding: 6,
                  borderRadius: 4,
                  width: 100,
                  backgroundColor: "#0039a6",

                  marginLeft: 4,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 13,
                    fontWeight: "400",
                  }}
                >
                  Genius Level
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      ))}
    </SafeAreaView>
  )
}

export default UpcomingTripsScreen

const styles = StyleSheet.create({})