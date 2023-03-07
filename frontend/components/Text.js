import React from "react";
import { Text, StyleSheet } from "react-native";
import { theme } from "../constants";

const Typography = ({
  h1,
  h2,
  title,
  body,
  medium,
  small,
  color,
  transform,
  bold,
  semibold,
  light,
  style,
  children,
  ...rest
}) => {
  const textStyles = [
    h1 && styles.h1,
    h2 && styles.h2,
    title && styles.title,
    body && styles.body,
    medium && styles.medium,
    small && styles.small,
    color && styles[color],
    transform && { textTransform: transform },
    bold && styles.bold,
    semibold && styles.semibold,
    light && styles.light,
    style,
  ];

  return (
    <Text style={textStyles} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: theme.fonts.h1,
  h2: theme.fonts.h2,
  title: theme.fonts.title,
  body: theme.fonts.body,
  medium: theme.fonts.medium,
  small: theme.fonts.small,

  black: { color: theme.colors.black },
  gray1: { color: theme.colors.gray1 },
  gray2: { color: theme.colors.gray2 },
  white: { color: theme.colors.white },

  center: { textAlign: "center" },

  bold: {
    fontWeight: "bold",
  },
  semibold: {
    fontWeight: "500",
  },
  light: {
    fontWeight: "200",
  },
});

export default Typography;
