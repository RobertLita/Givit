import {
  FlatList,
  Image,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

const { width, height } = Dimensions.get("window");

const Carousel = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (Number.isInteger(index)) setActiveIndex(index);
  }, [index]);

  return (
    <>
      <FlatList
        contentContainerStyle={{
          alignItems: "center",
        }}
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width, height: height / 2, overflow: "visible" }}
          />
        )}
        onScroll={(event) => {
          const slideSize = event.nativeEvent.layoutMeasurement.width;
          const index = event.nativeEvent.contentOffset.x / slideSize;
          setIndex(index);
        }}
      />
      <View className="flex-row absolute -bottom-5 self-center">
        {images.map((_, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="w-2 h-2 rounded mx-1"
              style={{
                backgroundColor: activeIndex === index ? "#888" : "#DCDCDC",
              }}
            />
          );
        })}
      </View>
    </>
  );
};

export default Carousel;
