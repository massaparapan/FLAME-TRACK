import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { colors } from "../constans/colors";

type Props = {
  onSubmit: (username: string, password: string) => Promise<void>;
  loading: boolean;
};

const LoginForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Usuario"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => onSubmit(username, password)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 35,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary[500],
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 25,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default LoginForm;
