import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Input";
import { useAuth } from "../../context/AuthContext";
import * as yup from "yup";
import { Formik } from "formik";

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must have at least 3 characters")
    .max(10, "Username must have at most 10 characters")
    .required("Username is required"),
  email: yup
    .string()
    .email("Not a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must have at least 6 characters")
    .max(15, "Password must have at most 15 characters")
    .matches(/^(?=.*[a-z])/, "Must contain at least one lowercase l")
    .matches(/^(?=.*[A-Z])/, "Must contain at least one uppercase character")
    .required("Password is required"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const SignUp = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, register } = useAuth();

  const onLogin = async (email, password) => {
    const response = await login(email, password);
  };

  const onSignUp = async (username, email, password) => {
    setLoading(true);
    const response = await register(username, email, password);
    if (response.status !== 200) {
      setError(response.data);
    } else onLogin(email, password);
    setLoading(false);
  };
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <ScrollView>
        <View>
          <Text className="font-bold text-3xl text-black ml-4">Sign up</Text>
          <Text className="text-lg font-bold ml-4 mt-2 text-gray-400">
            Please sign up to continue.
          </Text>
        </View>
        <Formik
          validationSchema={registerSchema}
          initialValues={{
            username: "",
            email: "",
            password: "",
            cpassword: "",
          }}
          onSubmit={(values) =>
            onSignUp(values.username, values.email, values.password)
          }
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <View className="items-center justify-center">
                <View className="h-[500] w-10/12 justify-evenly">
                  <Input
                    name="username"
                    label="Username*"
                    value={values.username}
                    handleChange={handleChange("username")}
                    placeholder="Your username"
                    style={{ width: "100%" }}
                    error={
                      errors.username && touched.username ? errors.username : ""
                    }
                    handleBlur={handleBlur("username")}
                  />
                  <Input
                    name="email"
                    label="Email*"
                    value={values.email}
                    handleChange={handleChange("email")}
                    handleBlur={handleBlur("email")}
                    placeholder="Your email"
                    email
                    error={errors.email && touched.email ? errors.email : ""}
                    style={{ width: "100%" }}
                  />
                  <Input
                    name="password"
                    label="Password*"
                    secureTextEntry
                    value={values.password}
                    handleChange={handleChange("password")}
                    handleBlur={handleBlur("password")}
                    placeholder="Your password"
                    password
                    error={
                      errors.password && touched.password ? errors.password : ""
                    }
                    style={{ width: "100%" }}
                  />
                  <Input
                    name="cpassword"
                    label="Confirm Password*"
                    secureTextEntry
                    value={values.cpassword}
                    handleChange={handleChange("cpassword")}
                    handleBlur={handleBlur("cpassword")}
                    placeholder="Confirm your password"
                    password
                    error={
                      errors.cpassword && touched.cpassword
                        ? errors.cpassword
                        : ""
                    }
                    style={{ width: "100%" }}
                  />
                </View>
              </View>
              <View className="items-center justify-center mt-2">
                {!loading ? (
                  <TouchableOpacity
                    className="px-20 py-2 bg-red-400 rounded-md items-center"
                    style={styles.shadow}
                    onPress={handleSubmit}
                    disabled={!isValid}
                  >
                    <Text className="text-white text-base">Sign up</Text>
                  </TouchableOpacity>
                ) : (
                  <ActivityIndicator size="large" color="#F9AC67" />
                )}

                <Text className="text-base font-semibold text-gray-400 mt-5">
                  Have an account?{" "}
                  <Text
                    className="text-red-400"
                    onPress={() => navigation.navigate("Login")}
                  >
                    Login
                  </Text>
                </Text>
                {error !== "" && (
                  <View className="bg-red-200 rounded w-3/4 h-8 items-center mt-4 justify-center">
                    <Text className="text-red-900 text-lg">{error}</Text>
                  </View>
                )}
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
});

export default SignUp;
