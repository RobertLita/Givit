import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Input = ({
  value,
  name,
  error,
  placeholder,
  secureTextEntry,
  label,
  email,
  multiline,
  numberOfLines,
  password,
  handleChange,
  handleBlur,
  rest,
}) => {
  const [secure, setSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);
  const inputType = email ? "email-address" : "default";
  const handleInputBlur = (event) => {
    event.persist(); // Persist the synthetic event
    if (handleBlur !== undefined) handleBlur(event);
    setIsFocused(false);
  };

  return (
    <View {...rest} className="relative">
      <Text className="text-gray-700 text-lg mb-1">{label}</Text>
      <View>
        <TextInput
          name={name}
          value={value}
          className="rounded border-gray-600 px-2 h-10 text-base py-2"
          multiline={multiline}
          numberOfLines={numberOfLines}
          keyboardType={inputType}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={secure}
          placeholder={placeholder}
          cursorColor="black"
          selectionColor={"black"}
          onChangeText={handleChange}
          style={[
            { borderWidth: 1 },
            multiline && {
              height: 100,
              textAlignVertical: "top",
            },
            isFocused && {
              borderColor: "#F9AC67",
              borderWidth: 2,
              borderBottomColor: "#F9AC67",
              borderTopColor: "#F9AC67",
            },
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={handleInputBlur}
        />
        {password && (
          <TouchableOpacity
            className="absolute items-end w-4 h-4 right-2 top-3"
            onPress={() => setSecure(!secure)}
          >
            <Ionicons
              color="#9DA3B4"
              size={16}
              name={!secure ? "md-eye" : "md-eye-off"}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text
        className="text-red-400 absolute"
        style={{
          bottom: -20,
          fontSize: 12,
        }}
      >
        {error}
      </Text>
    </View>
  );
};

export default Input;
