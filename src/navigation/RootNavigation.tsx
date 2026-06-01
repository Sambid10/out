/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { View, StyleSheet, Pressable, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from '@react-navigation/elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AddTodo from '../screens/AddTodo';
import ProfileScreen from '../screens/ProfileScreen';
import { useTheme } from '../context/ThemeContext';
import HomeStack from './HomeTabNaviagtion';
import { HomeStackParamList, RootStackParamList } from './navigationType';

const Tab = createBottomTabNavigator<RootStackParamList>();

function MyTabBar({ state, descriptors, navigation }) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.tabContainer,
        {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel ??
          options.title ??
          route.name;

        const iconColor = isFocused
          ? "#8B5CF6"
          : '#9CA3AF';

        const icon = options.tabBarIcon
          ? options.tabBarIcon({
              color: iconColor,
              size: 22,
              focused: isFocused,
            })
          : null;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
          >
            {icon}

            <Text
              style={[
                styles.tabText,
                {
                  color: iconColor,
                  fontWeight: isFocused ? '600' : '400',
                },
              ]}
            >
              {label}
            </Text>


          </Pressable>
        );
      })}
    </View>
  );
}

export default function RootStack() {
  const { theme ,mode} = useTheme();

  return (
    <>
    <StatusBar barStyle={mode === "dark" ?"light-content" :"dark-content"}/>
        <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    
    >
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <MyTabBar {...props} />}
      >
        <Tab.Screen
          name="HomeTabs"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={"#8B5CF6"}
              />
            ),
          }}
        />

        <Tab.Screen
          name="AddTodo"
          component={AddTodo}
          options={{
            tabBarLabel: 'Add',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'add-circle' : 'add-circle-outline'}
                size={size}
                color={"#8B5CF6"}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={size}
                color={"#8B5CF6"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
    </>

  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 64,
    borderTopWidth: 2,


  },

  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },

  tabText: {
    fontSize: 12,
  },

  activeIndicator: {
    marginTop: 4,
    width: 18,
    height: 3,
    borderRadius: 2,
  },
});