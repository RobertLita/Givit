import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Input";
import { useAuth } from "../../context/AuthContext";
import * as yup from "yup";
import { Formik } from "formik";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Not a valid email address!")
    .required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

const Login = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onLogin = async (email, password) => {
    setLoading(true);
    const response = await login(email, password);
    if (response.status !== 200) {
      setError(response.data);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <View style={{ flex: 1 }}>
        <Text className="font-bold text-3xl text-black ml-4">Login</Text>
        <Text className="text-lg font-bold ml-4 mt-2 text-gray-400">
          Please login to continue.
        </Text>
      </View>
      <Formik
        validationSchema={loginSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => onLogin(values.email, values.password)}
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
            <View className="items-center justify-center" style={{ flex: 2 }}>
              <View className="w-10/12 justify-around h-full">
                <Input
                  name="email"
                  label="Email*"
                  value={values.email}
                  handleChange={handleChange("email")}
                  email
                  error={errors.email && touched.email ? errors.email : ""}
                  style={{ width: "100%" }}
                  handleBlur={handleBlur("email")}
                />
                <Input
                  name="password"
                  label="Password*"
                  secureTextEntry
                  value={values.password}
                  handleChange={handleChange("password")}
                  error={
                    errors.password && touched.password ? errors.password : ""
                  }
                  password
                  style={{ width: "100%" }}
                  handleBlur={handleBlur("password")}
                />
              </View>
            </View>
            <View
              style={{ flex: 2 }}
              className="w-full items-center justify-center"
            >
              {!loading ? (
                <TouchableOpacity
                  className="px-20 py-2 bg-red-400 rounded-md items-center"
                  style={styles.shadow}
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  <Text className="text-white text-base">Login</Text>
                </TouchableOpacity>
              ) : (
                <ActivityIndicator size="large" color="#F9AC67" />
              )}
              <Text className="text-base font-semibold text-gray-400 mt-5">
                Don't have an account?{" "}
                <Text
                  className="text-red-400"
                  onPress={() => navigation.navigate("Sign up")}
                >
                  Sign up
                </Text>
              </Text>
              {/* <Text
                className="text-base font-semibold text-gray-300 mt-4"
                onPress={() => navigation.navigate("Sign up")}
              >
                Forgot your password?
              </Text> */}
              {error !== "" && (
                <View className="bg-red-200 rounded w-3/4 h-8 items-center mt-4 justify-center">
                  <Text className="text-red-900 text-lg">{error}</Text>
                </View>
              )}
            </View>
          </>
        )}
      </Formik>
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

export default Login;
