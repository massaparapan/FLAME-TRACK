import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { WebView } from "react-native-webview";
import { userService } from "@/src/services/userService";

const DASHBOARD_BASE_URL = "http://iot.ceisufro.cl:8080/dashboard/";

const DashboardScreen = () => {
  const [dashboardUrl, setDashboardUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPlan = async () => {
      try {
        setLoading(true);
        const userPlan = await userService.getUserPlan();

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
  }, []);

  if (loading) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container]}>
        <Text>{error}</Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default DashboardScreen;
