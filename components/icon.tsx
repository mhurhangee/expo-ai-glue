import FeatherIcon from '@expo/vector-icons/Feather';
import React from 'react';
import { useColorScheme, View, ViewStyle } from 'react-native';

type IconVariant = 'primary' | 'secondary' | 'muted' | 'inverse' | 'negative';
type ColorScheme = 'light' | 'dark' | 'auto';

interface IconProps {
  name: React.ComponentProps<typeof FeatherIcon>['name'];
  size?: number;
  className?: string;
  variant?: IconVariant;
  colorScheme?: ColorScheme;
  style?: ViewStyle;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  className = '',
  variant = 'primary',
  colorScheme = 'auto',
  style
}) => {
  const systemColorScheme = useColorScheme();
  const isDark = colorScheme === 'auto' ? systemColorScheme === 'dark' : colorScheme === 'dark';

  // Enhanced color mappings following shadcn/ui and Gluestack principles
  const getColor = (): string => {
    if (isDark) {
      switch (variant) {
        case 'primary': return '#F8FAFC'; // slate-50
        case 'secondary': return '#CBD5E1'; // slate-300
        case 'muted': return '#64748B'; // slate-500
        case 'inverse': return '#0F172A'; // slate-900
        case 'negative': return '#EF4444'; // red-500
        default: return '#F8FAFC';
      }
    } else {
      switch (variant) {
        case 'primary': return '#0F172A'; // slate-900
        case 'secondary': return '#475569'; // slate-600
        case 'muted': return '#64748B'; // slate-500
        case 'inverse': return '#F8FAFC'; // slate-50
        case 'negative': return '#DC2626'; // red-600
        default: return '#0F172A';
      }
    }
  };

  return (
    <View className={className} style={style}>
      <FeatherIcon 
        name={name} 
        size={size} 
        color={getColor()} 
      />
    </View>
  );
};