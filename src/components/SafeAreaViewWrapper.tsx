import React from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet } from 'react-native';
import Header from './Header';
import { useTheme } from '../context/ThemeContext';
import { View } from 'react-native';
interface Props {
  children: React.ReactNode;
  showHeader?: boolean
};

export default function SafeAreaViewWrapper({
  children,
  showHeader = true
}: Props) {
  const { theme,mode } = useTheme()
   const insets = useSafeAreaInsets()
  return (
   
    <SafeAreaView 
    
    style={{ backgroundColor: theme.colors.background, flex: 1, paddingHorizontal: 12}}>
      <View style={{ flex: 1 }}>
              <StatusBar barStyle={ mode === "light" ? "dark-content" : "light-content"} />
      {showHeader && <Header />}
      {children}
      </View>

    </SafeAreaView>
  );
}