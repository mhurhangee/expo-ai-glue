import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { useColorScheme, View } from 'react-native';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'muted' | 'inverse';
  colorScheme?: 'light' | 'dark' | 'auto';
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  className = '',
  variant = 'primary',
  colorScheme = 'auto'
}) => {
  const systemColorScheme = useColorScheme();
  const isDark = colorScheme === 'auto' ? systemColorScheme === 'dark' : colorScheme === 'dark';

  // Color mappings based on variant and theme
  const getColor = () => {
    if (isDark) {
      switch (variant) {
        case 'primary': return '#FFFFFF';
        case 'secondary': return '#D4D4D4';
        case 'muted': return '#9CA3AF';
        case 'inverse': return '#000000';
        default: return '#FFFFFF';
      }
    } else {
      switch (variant) {
        case 'primary': return '#000000';
        case 'secondary': return '#6B7280';
        case 'muted': return '#9CA3AF';
        case 'inverse': return '#FFFFFF';
        default: return '#000000';
      }
    }
  };

  return (
    <View className={className}>
      <FontAwesome 
        name={name as any} 
        size={size} 
        color={getColor()} 
      />
    </View>
  );
};