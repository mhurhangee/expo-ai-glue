import { Icon } from '@/components/icon';
import { ThemeToggle } from '@/components/theme-toggle';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Center } from '@/components/ui/center';
import { HStack } from '@/components/ui/hstack';
import { Link } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { SafeAreaView } from 'react-native';

import { router } from 'expo-router';

export default function WelcomeSplash() {
  const handleGetStarted = () => {
    router.push('/tabs');
  };

  const handleLearnMore = () => {
    router.push('/learn-more');
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
            <Text className="text-4xl font-heading font-bold text-center text-typography-900">
              Welcome!
            </Text>
            <Text className="text-lg font-body font-semibold text-center text-typography-500">
              This is a demo expo and gluestack app.
            </Text>
            <HStack space="lg">
              <Button
                variant="solid"
                action="primary"
                onPress={handleGetStarted}
                className="mt-4"
              >
                <Icon name="rocket" size={12} variant="inverse" className="mr-1" />
                <ButtonText>Get Started</ButtonText>
              </Button>
              <Button
                variant="solid"
                action="secondary"
                onPress={handleLearnMore}
                className="mt-4"
              >
                <Icon name="book" size={12} className="mr-1" />
                <ButtonText>Learn more</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </Center>

        {/* Built by section at bottom */}
        <Box className="pb-4 items-center">
          <VStack className="items-center">
            <Text className="text-sm font-mono text-typography-700">
              Built by m.hurhangee@me.com
            </Text>
            <HStack className="gap-4 mt-4">
              <Link href="https://github.com/mhurhangee/expo-ai-glue">
                <Icon name="github" variant="muted" />
              </Link>
              <Link href="mailto:m.hurhangee@me.com">
                <Icon name="envelope" variant="muted" />
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </SafeAreaView>
  );
}