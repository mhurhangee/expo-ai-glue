import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
} from '@expo-google-fonts/inter';
import {
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold
} from '@expo-google-fonts/space-grotesk';
import {
    SpaceMono_400Regular,
    SpaceMono_700Bold
} from '@expo-google-fonts/space-mono';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

export const useCustomFonts = () => {
  return useFonts({
    // Space Mono
    SpaceMono_400Regular,
    SpaceMono_700Bold,
    
    // Space Grotesk
    SpaceGrotesk_300Light,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    
    // Inter
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    
    // FontAwesome
    ...FontAwesome.font,
  });
};