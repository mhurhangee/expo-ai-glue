import { Icon } from '@/components/icon';
import { ThemeToggle } from '@/components/theme-toggle';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { HStack } from '@/components/ui/hstack';
import { Link } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native';

export default function WelcomeScreen() {

  const handleJoinMesh = () => {
    router.push('/tabs/dashboard');
  };

  const handleLearnMore = () => {
    router.push('/learn-more');
  };

  return (
    <SafeAreaView className="flex-1">
      <Box className="flex-1 px-6 justify-between">
        {/* Top right: theme toggle */}
        <Box className="absolute top-0 right-6 z-10">
          <ThemeToggle />
        </Box>

        {/* Centred: main content */}
        <Center className="flex-1">
          <VStack space="xl" className="items-center">

            {/* Header */}
            <HStack className="items-center">
              <Icon name="activity" size={20} variant="negative" className="mr-4" />
              <Text className="text-4xl font-heading font-bold text-center text-typography-900">
                Incident Mesh
              </Text>
            </HStack>

            {/* Subtitle */}
            <Text className="text-xl font-body font-semibold text-center text-typography-500">
              A Demo Emergency Response Network using Ditto's edge connectivity.
            </Text>

            {/* Navigation buttons */}
            <VStack space="lg">
              <Button
                variant="solid"
                action="primary"
                onPress={handleJoinMesh}
                className="mt-4"
              >
                <Icon name="share-2" size={12} variant="negative" className="mr-1" />
                <ButtonText>Join Incident Mesh</ButtonText>
              </Button>

              <Button
                variant="outline"
                onPress={handleLearnMore}
                className="mt-4"
              >
                <Icon name="book" size={12} className="mr-1" />
                <ButtonText>Learn More</ButtonText>
              </Button>
            </VStack>

            {/* Mesh info */}
            <VStack space="sm" className="items-center mt-4">
              <Text className="text-sm text-typography-500 text-center">
                <Icon name="wifi-off" size={10} className="mr-3" /> Uses offline mesh networking
              </Text>
              <Text className="text-xs text-typography-400 text-center">
                No internet required
              </Text>
            </VStack>
          </VStack>
        </Center>

        {/* Bottom: built by section */}
        <Box className="pb-4 items-center">
          <VStack className="items-center">
            <Text className="text-sm font-mono text-typography-950">
              Built by m.hurhangee@me.com
            </Text>
            <HStack className="gap-4 mt-4">
              <Link href="https://github.com/mhurhangee/incident">
                <Icon size={16} name="github" />
              </Link>
              <Link href="mailto:m.hurhangee@me.com">
                <Icon size={16} name="mail" />
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </SafeAreaView>
  );
}