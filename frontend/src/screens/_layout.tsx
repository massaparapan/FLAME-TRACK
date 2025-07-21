import DashboardScreen from "@/src/screens/DashboardScreen";
import SettingsScreen from "@/src/screens/SettingsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StatusBar } from "react-native";
import { colors } from "@/src/constans/colors";
import { Ionicons } from "@expo/vector-icons";

export type TabParamList = {
  Dashboard: undefined;
  Plans: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function Layout() {
  return (
    <>
      <StatusBar />
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.primary[500] },
          headerTintColor: "#ffffff",
          headerTitleStyle: { fontWeight: "bold" },
          tabBarActiveTintColor: colors.primary[500],
          tabBarInactiveTintColor: "#666",
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: "Dashboard",
            tabBarLabel: "Inicio",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Plans"
          component={SettingsScreen}
          options={{
            title: "Configuración",
            tabBarLabel: "Configuración",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
