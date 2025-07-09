import DashboardScreen from "@/src/screens//DashboardScreen";
import MainMenu from "@/src/screens/MenuScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StatusBar } from "react-native";
import { colors } from "./constans/colors";
import PlansScreen from "./screens/PlansScreen";
import { RootStackParamList } from "./types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar/>
      
      <Stack.Navigator
        initialRouteName="MainMenu"
  
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.primary[500] },
          headerTintColor: "#ffffff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{ title: "Menú Principal" }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: "Dashboard" }}
        />
        <Stack.Screen
          name="Plans"
          component={PlansScreen}
          options={{ title: "Planes" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
