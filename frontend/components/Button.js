import React from "react";
import { TouchableOpacity, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../constants";

const Button = ({
  gradient = false,
  bgColor = "white",
  shadow,
  style,
  children,
  ...rest
}) => {
  const buttonStyle = [
    styles.button,
    shadow && styles.shadow,
    bgColor && styles[bgColor],
    style,
  ];

  if (gradient) {
    return (
      <TouchableOpacity {...rest} style={buttonStyle} activeOpacity={0.7}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0.1, 0.9]}
          colors={[theme.colors.primary, theme.colors.secondary]}
          style={buttonStyle}
        >
          {children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={buttonStyle} activeOpacity={0.7}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    width: theme.sizes.base * 12,
    justifyContent: "center",
    alignItems: "center",
  },

  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
      },
      web: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  accent: { backgroundColor: theme.colors.accent },
  primary: { backgroundColor: theme.colors.primary },
  secondary: { backgroundColor: theme.colors.secondary },
  black: { backgroundColor: theme.colors.black },
  white: { backgroundColor: theme.colors.white },
  gray1: { backgroundColor: theme.colors.gray1 },
  gray2: { backgroundColor: theme.colors.gray2 },
});

export default Button;
