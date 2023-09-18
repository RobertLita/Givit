import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Review from "../../components/Review";
import ListHeader from "../../components/ListHeader";

const UserReviews = () => {
  const route = useRoute();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const params = route.params;
    if (params !== undefined && params.data !== undefined) {
      setReviews(params.data);
    }
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      {reviews !== undefined && reviews.length == 0 ? (
        <View className="justify-center items-center">
          <Text className="text-xl">No rewards!</Text>
        </View>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            alignItems: "center",
          }}
          data={reviews}
          renderItem={({ item, index }) => (
            <Review
              key={index}
              message={item.message}
              rating={item.amount}
              id={item.reviewerId}
            />
          )}
          ListHeaderComponent={<ListHeader title="Your reviews" />}
        />
      )}
    </SafeAreaView>
  );
};

export default UserReviews;
