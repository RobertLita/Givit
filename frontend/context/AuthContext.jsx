import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const TOKEN_KEY = "my-jwt";
export const API_URL = "http://10.0.2.2:8000";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        setAuthState({
          token: token,
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
    } catch (e) {
      console.log(e);
      // return { error: true, message: e.response.data.msg };
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

      setAuthState({
        token: response.data.access_token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, response.data.access_token);

      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: "",
      authenticated: false,
    });
  };

  const value = { register, login, logout, authState };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
