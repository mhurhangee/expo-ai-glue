import { Icon } from '@/components/icon';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { SafeAreaView, ScrollView } from 'react-native';

export default function ExploreTab() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <Box className="flex-1 px-6 py-8">
          <VStack space="xl">
            <VStack space="md">
              <Heading className="text-3xl font-heading font-bold text-typography-900">
                Explore
              </Heading>
              <Text className="text-lg font-body text-typography-600">
                Discover new content and features
              </Text>
            </VStack>

            {/* Search Bar */}
            <Input variant="outline">
              <InputField placeholder="Search for anything..." />
            </Input>

            {/* Categories */}
            <VStack space="md">
              <Text className="text-xl font-heading font-semibold text-typography-900">
                Categories
              </Text>
              <VStack space="sm">
                {['Technology', 'Design', 'Development', 'Business'].map((category) => (
                  <Box key={category} className="bg-background-100 p-4 rounded-lg">
                    <HStack className="items-center">
                      <Icon name="folder" size={16} variant="primary" className="mr-3" />
                      <Text className="font-body text-typography-900">{category}</Text>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </VStack>

            {/* Trending */}
            <VStack space="md">
              <Text className="text-xl font-heading font-semibold text-typography-900">
                Trending
              </Text>
              <Box className="bg-background-100 p-4 rounded-lg">
                <VStack space="sm">
                  <HStack className="items-center">
                    <Icon name="trending-up" size={16} variant="primary" className="mr-2" />
                    <Text className="font-body font-semibold text-typography-900">Hot Topic</Text>
                  </HStack>
                  <Text className="font-body text-typography-700">
                    This is a trending item that users are engaging with the most.
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}