import React from 'react';
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
  return (
    <View 
    style={{ backgroundColor:theme.colors.background, flex: 1,paddingHorizontal:12}}>
      <View style={{ flex: 1 }}>
      {showHeader && <Header />}
      {children}
      </View>

    </View>
  );
}