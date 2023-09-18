import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "my-jwt";
export const API_URL = " https://83a9-80-96-21-160.ngrok-free.app";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    userType: null,
    userId: null,
    isAdmin: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        setAuthState({
          token: token,
          userType: JSON.parse(jwtDecode(token).sub).type.split(".")[1],
          userId: JSON.parse(jwtDecode(token).sub).id,
          isAdmin: JSON.parse(jwtDecode(token).sub).id_admin,
          authenticated: true,
        });

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    };
    loadToken();
  }, []);

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/users/`,
        {
          username,
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return { data: "success", status: response.status };
    } catch (e) {
      return { data: e.response.data.detail, status: e.response.status };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/login/access-token`,
        {
          username: email,
          password,
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      console.log(JSON.parse(jwtDecode(response.data.access_token).sub));
      setAuthState({
        token: response.data.access_token,
        userType: JSON.parse(
          jwtDecode(response.data.access_token).sub
        ).type.split(".")[1],
        userId: JSON.parse(jwtDecode(response.data.access_token).sub).id,
        isAdmin: JSON.parse(jwtDecode(response.data.access_token).sub).is_admin,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, response.data.access_token);

      return { data: "success", status: response.status };
    } catch (e) {
      console.log(e);
      return { data: e.response.data.detail, status: e.response.status };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: "",
      userType: null,
      userId: null,
      isAdmin: null,
      authenticated: false,
    });
  };

  const value = { register, login, logout, authState };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
