import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Message = ({ message, you, rest }) => {
  return (
    <View
      style={[
        styles.container,
        you
          ? { backgroundColor: "rgb(248, 113, 113)", alignSelf: "flex-end" }
          : { backgroundColor: "slategray", alignSelf: "flex-start" },
      ]}
      {...rest}
    >
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "gray",
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 5,
    maxWidth: "50%",
    minWidth: "15%",
    marginHorizontal: 6,
  },
  text: {
    fontSize: 19,
    color: "white",
  },
});

export default Message;
