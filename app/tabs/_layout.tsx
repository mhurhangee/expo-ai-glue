// In your (tabs)/_layout.tsx
import { useTheme } from '@/hooks/use-theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    const { isDarkMode } = useTheme();

    return (
        <>
            <Tabs
            initialRouteName='home'
                screenOptions={{
                    tabBarActiveTintColor: isDarkMode ? '#FFFFFF' : '#000000',
                    tabBarInactiveTintColor: '#666666',
                    tabBarStyle: {
                        backgroundColor: isDarkMode ? '#181719' : '#FFFFFF',
                        borderTopColor: isDarkMode ? '#333333' : '#E5E5E5',
                    },
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                        title: 'Explore',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="compass" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="user" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="cog" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="more"
                    options={{
                        title: 'More',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="ellipsis-h" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>

        </>
    );
}