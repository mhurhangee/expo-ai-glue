import { Icon } from '@/components/icon';
import { ThemeToggle } from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useIncidentDitto } from '@/context/incident-ditto-context';
import { useTheme } from '@/hooks/use-theme';
import { router } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, ScrollView } from 'react-native';

export default function SettingsScreen() {
  const { currentIncident, isInitialized, error } = useIncidentDitto();
  const { isDarkMode } = useTheme();

  const handleLeaveIncident = () => {
    Alert.alert(
      'Leave Incident',
      `Are you sure you want to leave incident ${currentIncident}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => {
            // Navigate back to welcome screen, clearing the incident key
            router.replace('/');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <VStack space="lg" className="p-4">
          
          {/* Current Incident Card */}
          <Card className="p-4">
            <VStack space="md">
              <HStack className="justify-between items-center">
                <Text className="text-lg font-bold">Current Incident</Text>
                {isInitialized && (
                  <Badge variant="success">Active</Badge>
                )}
              </HStack>
              
              {currentIncident ? (
                <VStack space="sm">
                  <HStack className="justify-between">
                    <Text className="text-sm text-gray-600">Incident Key:</Text>
                    <Text className="font-medium">{currentIncident}</Text>
                  </HStack>
                  
                  <HStack className="justify-between">
                    <Text className="text-sm text-gray-600">Status:</Text>
                    <Text className="font-medium">
                      {isInitialized ? 'Connected' : 'Connecting...'}
                    </Text>
                  </HStack>
                  
                  {error && (
                    <Text className="text-sm text-red-500">Error: {error}</Text>
                  )}
                  
                  <Button 
                    variant="outline" 
                    action="secondary" 
                    onPress={handleLeaveIncident}
                    className="mt-2"
                  >
                    <Icon name="log-out" size={16} className="mr-2" />
                    <ButtonText>Leave Incident</ButtonText>
                  </Button>
                </VStack>
              ) : (
                <VStack space="sm">
                  <Text className="text-gray-500">No active incident</Text>
                  <Button 
                    variant="outline" 
                    onPress={() => router.replace('/')}
                  >
                    <Icon name="plus" size={16} className="mr-2" />
                    <ButtonText>Join Incident</ButtonText>
                  </Button>
                </VStack>
              )}
            </VStack>
          </Card>

          {/* Appearance Settings */}
          <Card className="p-4">
            <VStack space="md">
              <Text className="text-lg font-bold">Appearance</Text>
              
              <HStack className="justify-between items-center">
                <VStack>
                  <Text className="font-medium">Theme</Text>
                  <Text className="text-sm text-gray-600">
                    {isDarkMode ? 'Dark mode' : 'Light mode'}
                  </Text>
                </VStack>
                <ThemeToggle />
              </HStack>
            </VStack>
          </Card>

          {/* App Information */}
          <Card className="p-4">
            <VStack space="md">
              <Text className="text-lg font-bold">About</Text>
              
              <VStack space="sm">
                <HStack className="justify-between">
                  <Text className="text-sm text-gray-600">App Name:</Text>
                  <Text className="font-medium">Incident Mesh</Text>
                </HStack>
                
                <HStack className="justify-between">
                  <Text className="text-sm text-gray-600">Version:</Text>
                  <Text className="font-medium">1.0.0</Text>
                </HStack>
                
                <HStack className="justify-between">
                  <Text className="text-sm text-gray-600">Build:</Text>
                  <Text className="font-medium">Development</Text>
                </HStack>
              </VStack>
              
              <Text className="text-xs text-gray-500 mt-4">
                Built with Ditto for offline-first incident response coordination.
              </Text>
            </VStack>
          </Card>

        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}