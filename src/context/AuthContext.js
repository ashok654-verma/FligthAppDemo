// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const storedUser = await AsyncStorage.getItem('registeredUser');
    if (!storedUser) return false;

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.email === email && parsedUser.password === password) {
      const token = 'dummy-token';
      setUserToken(token);
      await AsyncStorage.setItem('userToken', token);
      return true;
    }

    return false; // invalid credentials
  };

  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem('userToken');
  };

  const register = async (email, password) => {
    // Save the registered user
    const user = { email, password };
    await AsyncStorage.setItem('registeredUser', JSON.stringify(user));
    console.log('User registered:', user);
    return true;
  };

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        login,
        logout,
        register,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
