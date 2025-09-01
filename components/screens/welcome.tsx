// screens/welcome.tsx
import { Icon } from '@/components/icon';
import { ThemeToggle } from '@/components/theme-toggle';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import { Link } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { normalizeIncidentKey, validateIncidentKey } from '@/utils/incident-key';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

export default function WelcomeScreen() {
  const [incidentKey, setIncidentKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const isKeyValid = validateIncidentKey(incidentKey);

  const handleIncidentKeyChange = (text: string) => {
    // Auto-normalize as user types
    const normalized = text.toUpperCase();
    setIncidentKey(normalized);
  };

  const handleJoinIncident = async () => {
    if (!isKeyValid) return;

    setIsValidating(true);
    
    try {
      const normalizedKey = normalizeIncidentKey(incidentKey);
      
      // Navigate to the incident screen with the incident key
      router.push({
        pathname: '/tabs/home',
        params: { incidentKey: normalizedKey }
      });
    } catch (error) {
      console.error('Error joining incident:', error);
      // In a real app, show error toast here
    } finally {
      setIsValidating(false);
    }
  };

  const handleLearnMore = () => {
    router.push('/learn-more');
  };

  const handleQuickDemo = () => {
    setIncidentKey('DEMO-001');
    // Auto-join after a brief moment
    setTimeout(() => handleJoinIncident(), 100);
  };

  return (
    <SafeAreaView className="flex-1">
      <Box className="flex-1 px-6 justify-between">
        <Box className="absolute top-0 right-6 z-10">
          <ThemeToggle />
        </Box>
        
        {/* Main content centered */}
        <Center className="flex-1">
          <VStack space="xl" className="items-center">
            <HStack className="items-center">
              <Icon name="activity" size={20} variant="negative" className="mr-4" />
              <Text className="text-4xl font-heading font-bold text-center text-typography-900">
                Incident Mesh
              </Text>
            </HStack>
            
            <Text className="text-xl font-body font-semibold text-center text-typography-500">
              Connect to your incident response network
            </Text>
            
            <VStack space="md" className="w-full max-w-sm">
              <Text className="text-lg font-body font-semibold text-center text-typography-600">
                Enter your incident key to join
              </Text>
              
              <Input variant="outline">
                <InputField 
                  placeholder="e.g. FIRE-2024-001" 
                  value={incidentKey} 
                  onChangeText={handleIncidentKeyChange}
                  autoCapitalize="characters"
                  onSubmitEditing={handleJoinIncident}
                  returnKeyType="go"
                />
              </Input>
              
              {incidentKey.trim() && !isKeyValid && (
                <Text className="text-sm text-red-500 text-center">
                  Incident key must be 3-50 characters (letters, numbers, hyphens, underscores)
                </Text>
              )}
            </VStack>
            
            <VStack space="lg">
              <Button
                variant="solid"
                action="primary"
                onPress={handleJoinIncident}
                className="mt-4"
                disabled={!isKeyValid || isValidating}
              >
                {isValidating ? (
                  <>
                    <Icon name="loader" size={12} variant="inverse" className="mr-1" />
                    <ButtonText>Joining...</ButtonText>
                  </>
                ) : (
                  <>
                    <Icon name="wifi" size={12} variant="inverse" className="mr-1" />
                    <ButtonText>Join Incident</ButtonText>
                  </>
                )}
              </Button>
              
              <HStack space="md">
                <Button
                  variant="outline"
                  action="secondary"
                  onPress={handleQuickDemo}
                  className="flex-1"
                  disabled={isValidating}
                >
                  <Icon name="play" size={12} className="mr-1" />
                  <ButtonText>Quick Demo</ButtonText>
                </Button>
                
                <Button
                  variant="outline"
                  action="secondary"
                  onPress={handleLearnMore}
                  className="flex-1"
                  disabled={isValidating}
                >
                  <Icon name="book" size={12} className="mr-1" />
                  <ButtonText>Learn More</ButtonText>
                </Button>
              </HStack>
            </VStack>
            
            <VStack space="sm" className="items-center mt-4">
              <Text className="text-sm text-typography-500 text-center">
                🔒 Uses offline mesh networking
              </Text>
              <Text className="text-xs text-typography-400 text-center">
                No internet required after initial setup
              </Text>
            </VStack>
          </VStack>
        </Center>

        {/* Built by section at bottom */}
        <Box className="pb-4 items-center">
          <VStack className="items-center">
            <Text className="text-sm font-mono text-typography-700">
              Built by m.hurhangee@me.com
            </Text>
            <HStack className="gap-4 mt-4">
              <Link href="https://github.com/mhurhangee/expo-glue">
                <Icon name="github" variant="muted" />
              </Link>
              <Link href="mailto:m.hurhangee@me.com">
                <Icon name="mail" variant="muted" />
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </SafeAreaView>
  );
}