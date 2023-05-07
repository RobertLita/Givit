import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Input = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  label,
  error,
  email,
  password,
}) => {
  const [secure, setSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);
  const inputType = email ? "email-address" : "default";

  const renderLabel = () => {
    if (label === undefined) return <></>;
    if (error)
      return <Text className="text-red-600 text-lg mb-1">{label}</Text>;
    return <Text className="text-gray-400 text-lg mb-1">{label}</Text>;
  };

  return (
    <View className="w-11/12">
      {renderLabel()}
      <View>
        <TextInput
          value={value}
          onChangeText={setValue}
          className="rounded border-gray-600 px-2 h-10"
          keyboardType={inputType}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={secure}
          placeholder={placeholder}
          cursorColor="black"
          style={[
            { borderWidth: 1 },
            isFocused && {
              borderColor: "#F9AC67",
              borderWidth: 2,
              borderBottomColor: "#F9AC67",
              borderTopColor: "#F9AC67",
            },
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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
    </View>
  );
};

export default Input;
