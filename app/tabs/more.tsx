// app/(tabs)/more.tsx
import { Icon } from '@/components/icon';
import { ThemeToggle } from '@/components/theme-toggle';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Pressable, SafeAreaView } from 'react-native';

export default function MoreTab() {
  return (
    <SafeAreaView className="flex-1">
      <Box className="flex-1 px-6 py-8">
        <Box className="absolute top-0 right-6 z-10">
          <ThemeToggle />
        </Box>

        <VStack space="xl">
          <Heading className="text-3xl font-heading font-bold text-typography-900">
            More
          </Heading>

          <VStack space="sm">
            <Pressable 
              className="py-4 px-4 bg-background-100 rounded-lg active:bg-background-200"
              onPress={() => console.log('Notifications')}
            >
              <HStack className="items-center">
                <Icon name="bell" size={16} variant="primary" className="mr-3" />
                <Text className="font-body text-typography-900 flex-1">Notifications</Text>
                <Icon name="chevron-right" size={14} variant="secondary" />
              </HStack>
            </Pressable>

            <Pressable 
              className="py-4 px-4 bg-background-100 rounded-lg active:bg-background-200"
              onPress={() => console.log('Help')}
            >
              <HStack className="items-center">
                <Icon name="question-circle" size={16} variant="primary" className="mr-3" />
                <Text className="font-body text-typography-900 flex-1">Help & Support</Text>
                <Icon name="chevron-right" size={14} variant="secondary" />
              </HStack>
            </Pressable>

            <Pressable 
              className="py-4 px-4 bg-background-100 rounded-lg active:bg-background-200"
              onPress={() => console.log('About')}
            >
              <HStack className="items-center">
                <Icon name="info-circle" size={16} variant="primary" className="mr-3" />
                <Text className="font-body text-typography-900 flex-1">About</Text>
                <Icon name="chevron-right" size={14} variant="secondary" />
              </HStack>
            </Pressable>
          </VStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
}