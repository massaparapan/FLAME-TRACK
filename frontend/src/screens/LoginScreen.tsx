import React, { useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import LoginForm from "../components/LoginFormComponent";
import { authService } from "../services/authService";
import type { loginRequest } from "../types/types";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    try {
      const request: loginRequest = { username, password };
      await authService.login(request);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Error desconocido"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginForm onSubmit={handleLogin} loading={loading} />
    </SafeAreaView>
  );
}
