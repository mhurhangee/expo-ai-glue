import { Icon } from '@/components/icon';
import { ThemeToggle } from '@/components/theme-toggle';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { SafeAreaView } from 'react-native';

export default function HomeTab() {
  return (
    <SafeAreaView className="flex-1">
      <Box className="flex-1 px-6 py-8">
        {/* Header with theme toggle */}
        <Box className="absolute top-0 right-6 z-10">
          <ThemeToggle />
        </Box>

        <VStack space="xl" className="flex-1">
          <VStack space="md">
            <Heading className="text-3xl font-heading font-bold text-typography-900">
              Dashboard
            </Heading>
            <Text className="text-lg font-body text-typography-600">
              Welcome to your main hub
            </Text>
          </VStack>

          {/* Quick Actions */}
          <VStack space="md">
            <Text className="text-xl font-heading font-semibold text-typography-900">
              Quick Actions
            </Text>
            <VStack space="sm">
              <Button variant="outline" action="primary">
                <Icon name="plus" size={16} variant="primary" className="mr-2" />
                <ButtonText>Create New</ButtonText>
              </Button>
              <Button variant="outline" action="secondary">
                <Icon name="search" size={16} variant="primary" className="mr-2" />
                <ButtonText>Search</ButtonText>
              </Button>
            </VStack>
          </VStack>

          {/* Stats Cards */}
          <VStack space="md">
            <Text className="text-xl font-heading font-semibold text-typography-900">
              Overview
            </Text>
            <HStack space="md">
              <Box className="flex-1 bg-background-100 p-4 rounded-lg">
                <VStack space="xs">
                  <Icon name="heart" size={20} variant="primary" />
                  <Text className="font-mono text-2xl font-bold text-typography-900">42</Text>
                  <Text className="font-body text-sm text-typography-600">Favorites</Text>
                </VStack>
              </Box>
              <Box className="flex-1 bg-background-100 p-4 rounded-lg">
                <VStack space="xs">
                  <Icon name="star" size={20} variant="primary" />
                  <Text className="font-mono text-2xl font-bold text-typography-900">128</Text>
                  <Text className="font-body text-sm text-typography-600">Points</Text>
                </VStack>
              </Box>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}