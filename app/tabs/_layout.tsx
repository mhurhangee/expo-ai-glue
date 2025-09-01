// app/tabs/_layout.tsx
import { Icon } from '@/components/icon';
import { MeshStatusIndicator } from '@/components/mesh-status-indicator';
import { useTheme } from '@/hooks/use-theme';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
    const { isDarkMode } = useTheme();

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            {/* Incident mesh status indicator at the top */}
            <MeshStatusIndicator />
            
            <Tabs
                initialRouteName='dashboard'
                screenOptions={{
                    // Active/inactive colors with better contrast
                    tabBarActiveTintColor: isDarkMode ? '#F8FAFC' : '#0F172A',
                    tabBarInactiveTintColor: isDarkMode ? '#64748B' : '#64748B',
                    
                    // Modern tab bar styling
                    tabBarStyle: {
                        backgroundColor: isDarkMode ? '#020817' : '#FFFFFF',
                        borderTopWidth: 1,
                        borderTopColor: isDarkMode ? '#1E293B' : '#E2E8F0',
                        height: Platform.OS === 'ios' ? 88 : 68,
                        paddingTop: 8,
                        paddingBottom: Platform.OS === 'ios' ? 28 : 12,
                        paddingHorizontal: 16,
                        elevation: 0, // Remove Android shadow
                        shadowOpacity: 0, // Remove iOS shadow for cleaner look
                    },
                    
                    // Label styling
                    tabBarLabelStyle: {
                        fontSize: 11,
                        fontWeight: '500',
                        marginTop: 4,
                        letterSpacing: 0.15,
                    },
                    
                    // Icon styling
                    tabBarIconStyle: {
                        marginBottom: -2,
                    },
                    
                    // Remove header (we'll handle our own)
                    headerShown: false,
                    
                    // Smooth animation
                    tabBarHideOnKeyboard: true,
                }}
            >
                <Tabs.Screen
                    name="dashboard"
                    options={{
                        title: 'Dashboard',
                        tabBarIcon: ({ focused }) => (
                            <Icon 
                                name="activity" 
                                size={20}
                                variant={focused ? 'primary' : 'muted'}
                            />
                        ),
                    }}
                />
                
                <Tabs.Screen
                    name="reports"
                    options={{
                        title: 'Reports',
                        tabBarIcon: ({ focused }) => (
                            <Icon 
                                name="file-text" 
                                size={20}
                                variant={focused ? 'primary' : 'muted'}
                            />
                        ),
                    }}
                />
                
                <Tabs.Screen
                    name="network"
                    options={{
                        title: 'Network',
                        tabBarIcon: ({ focused }) => (
                            <Icon 
                                name="wifi" 
                                size={20}
                                variant={focused ? 'primary' : 'muted'}
                            />
                        ),
                    }}
                />
                
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ focused }) => (
                            <Icon 
                                name="settings" 
                                size={20}
                                variant={focused ? 'primary' : 'muted'}
                            />
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
}