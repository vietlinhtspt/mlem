import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  YellowBox,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import SkeletonContent from "react-native-skeleton-content-nonexpo";

export default function (props) {
  // Example data
  // {"descreption": null,
  // "discountRate": null,
  // "errors": null,
  // "foodFoodGroupingMappings": null,
  // "foodFoodTypeMappings": null,
  // "id": 2,
  // "image": null,
  // "imageId": null,
  // "name": "Gimbap chiên",
  // "priceEach": 20000,
  // "statusId": 1}
  const { isLoading, cardData, title, onPressDetail } = props;
  useEffect(() => {
    YellowBox.ignoreWarnings([
      "Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`",
    ]);
  });
  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={styles.title}>{title.toUpperCase()}</Text>
        </View>
        <View style={styles.seeAll}>
          <TouchableOpacity onPress={() => onPressDetail()}>
            <Text style={{ fontSize: 11, color: "#de3333" }}>
              Xem Tất Cả >>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <SkeletonContent
        containerStyle={{ flex: 1, width: 300, flexDirection: "row" }}
        isLoading={cardData ? false : true}
        // isLoading={isLoading}
        layout={[
          { key: "1", width: 100, height: 100, margin: 10 },
          { key: "2", width: 100, height: 100, margin: 10 },
          { key: "3", width: 100, height: 100, margin: 10 },
          { key: "4", width: 100, height: 100, margin: 10 },
        ]}
      >
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={cardData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  padding: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#f0f3f5",
                    padding: 4,
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 130, height: 110 }}
                  />

                  <Text style={styles.foodname}>{item.name}</Text>
                  <Text style={styles.price}>{item.priceEach}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        ></FlatList>
      </SkeletonContent>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    // top: 155,
    marginTop: 4,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 8,
  },
  seeAll: {
    marginTop: 8,
    marginRight: 10,
  },
  foodname: {
    fontSize: 11,
  },
  price: {
    fontSize: 9,
    color: "#009FFF",
  },
});
