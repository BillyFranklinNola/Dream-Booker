import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SearchResults = ({ data, input, setInput }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item.place.toLowerCase().includes(input.toLowerCase())) {
            if (input === "") {
              return null;
            }
            return (
              <Pressable
                onPress={() => {
                  setInput(item.place);
                  navigation.navigate("Home", {
                    input: item.place,
                  });
                }}
                style={styles.resultContainer}
              >
                <View>
                  <Image
                    style={styles.resultImage}
                    source={{ uri: item.placeImage }}
                  />
                </View>
                <View style={styles.resultTextContainer}>
                  <Text style={styles.resultTextTitle}>{item.place}</Text>
                  <Text style={styles.resultTextDescription}>
                    {item.shortDescription}
                  </Text>
                  <Text style={styles.resultTextProperties}>
                    {item.properties.length} Properties
                  </Text>
                </View>
              </Pressable>
            );
          }
        }}
      />
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  resultContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  resultImage: {
    width: 70,
    height: 70,
  },
  resultTextContainer: {
    marginLeft: 10,
  },
  resultTextTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  resultTextDescription: {
    marginVertical: 4,
  },
  resultTextProperties: {
    color: "gray",
    fontSize: 15,
  },
});
