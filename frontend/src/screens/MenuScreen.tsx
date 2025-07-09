import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { MenuItem } from '../types/menuItem';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RootStackParamList = {
  MainMenu: undefined;
  Dashboard: undefined;
  Settings: undefined;
  Plans: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MainMenu = () => {
  const navigation = useNavigation<NavigationProp>();

  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: 'Dashboard',
      icon: 'dashboard',
      onPress: () => navigation.navigate('Dashboard'),
    },
    {
      id: 2,
      title: 'Configuración',
      icon: 'settings',
      onPress: () => {
        console.log('Configuración');
      },
    },
    {
      id: 3,
      title: 'Planes',
      icon: 'layers',
      onPress: () => {
        console.log('Planes');
      },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <Icon name={item.icon} size={24} color="#333" style={styles.icon} />
            <Text style={styles.menuText}>{item.title}</Text>
            <Icon name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    color: '#999',
    fontSize: 12,
  },
});

export default MainMenu;