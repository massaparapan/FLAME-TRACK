import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import LoginForm from "../components/LoginFormComponent";
import RegisterForm from "../components/RegisterFormComponent";
import { authService } from "../services/authService";
import type { loginRequest, registerRequest } from "../types/types";
import { colors } from "../constans/colors";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AuthScreenNavigationProp = NativeStackNavigationProp<any>;

const AuthScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };

  const handleLogin = async (username: string, password: string) => {
    setLoading(true);
    try {
      const request: loginRequest = { username, password };
      await authService.login(request);
      navigation.navigate("Main");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    try {
      const request: registerRequest = {
        username,
        email,
        password,
        plan_id: 1,
      };
      await authService.register(request);
      navigation.navigate("Main");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrap}>
        <View style={styles.formWrapper}>
          {mode === "login" ? (
            <LoginForm onSubmit={handleLogin} loading={loading} />
          ) : (
            <RegisterForm onSubmit={handleRegister} loading={loading} />
          )}
        </View>

        <View style={styles.switchModeContainer}>
          <Text>
            {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          </Text>
          <TouchableOpacity onPress={toggleMode}>
            <Text style={styles.switchModeText}>
              {mode === "login" ? "Registrarse" : "Iniciar sesión"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary[500],
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  wrap: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  formWrapper: {
    width: "100%",
  },
  switchModeContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  switchModeText: {
    color: "#1e90ff",
    fontWeight: "bold",
  },
});

export default AuthScreen;
