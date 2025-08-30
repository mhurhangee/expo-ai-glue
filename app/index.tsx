import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import React from 'react';
import { SafeAreaView } from 'react-native';

export default function WelcomeSplash() {
  const handleGetStarted = () => {
    // Add your navigation logic here
    console.log('Get Started pressed');
  };

  return (
    <SafeAreaView className="flex-1">
      <Center className="flex-1 px-6">
        <VStack space="xl" className="items-center">
          <Text className="text-4xl font-semibold text-center text-typography-900">
            Welcome!
          </Text>
          <HStack space="lg">
          <Button 
            variant="solid"
            action="secondary"
            onPress={handleGetStarted}
            className="mt-4"
          >
            <ButtonText>Get Started</ButtonText>
          </Button>
          <Button 
            variant="solid"
            action="primary"
            onPress={handleGetStarted}
            className="mt-4"
          >
            <ButtonText>Learn more</ButtonText>
          </Button>
          </HStack>
        </VStack>
      </Center>
    </SafeAreaView>
  );
}