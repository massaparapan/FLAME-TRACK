import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Text, Button } from "react-native";
import { WebView } from "react-native-webview";
import { userService } from "@/src/services/userService";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";

type DashboardScreenNavigationProp = NativeStackNavigationProp<any, 'Dashboard'>;

const DASHBOARD_BASE_URL = "http://iot.ceisufro.cl:8080/dashboard/";

export default function DashboardScreen() {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const [dashboardUrl, setDashboardUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsDevice, setNeedsDevice] = useState(false);

  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        setLoading(true);
        const userPlan = await userService.getUserPlan();

        const userDevices = await userService.getMyDevices();

        if (!userDevices || userDevices.length === 0) {
          setNeedsDevice(true);
          setLoading(false);
          return;
        }

        if (userPlan.dashboard_id) {
          setDashboardUrl(DASHBOARD_BASE_URL + userPlan.dashboard_id);
        } else {
          setError("No se recibió el ID del dashboard");
        }
      } catch (err) {
        setError("No se pudo obtener el plan del usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlan();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (needsDevice) {
    return (
      <View style={styles.container}>
        <Text>No tienes dispositivos registrados.</Text>
        <Button
          title="Escanear código QR"
          onPress={() => navigation.navigate("QRScanner")}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {dashboardUrl ? (
        <WebView
          source={{ uri: dashboardUrl }}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mixedContentMode="compatibility"
          onShouldStartLoadWithRequest={(request) =>
            request.url.includes("iot.ceisufro.cl") ||
            request.url.includes("localhost")
          }
        />
      ) : (
        <Text>No se encontró la URL del dashboard</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
