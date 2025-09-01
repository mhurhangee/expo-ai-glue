import { Icon } from '@/components/icon';
import { useTheme } from '@/hooks/use-theme';
import { Pressable } from 'react-native';

export const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <Pressable 
    onPress={toggleDarkMode}
    className="p-2 rounded-full bg-background active:bg-background-200"
  >
    <Icon 
      name={isDarkMode ? "sun" : "moon"} 
      size={20} 
      variant="primary" 
    />
  </Pressable>
  );
};