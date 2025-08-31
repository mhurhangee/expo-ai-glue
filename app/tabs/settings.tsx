import { Icon } from '@/components/icon';
import { ThemeToggle } from '@/components/theme-toggle';
import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView } from 'react-native';

export default function SettingsTab() {
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <Box className="flex-1 px-6 py-8">
          <Box className="absolute top-0 right-6 z-10">
            <ThemeToggle />
          </Box>

          <VStack space="xl">
            <VStack space="md">
              <Heading className="text-3xl font-heading font-bold text-typography-900">
                Settings
              </Heading>
              <Text className="text-lg font-body text-typography-600">
                Customize your app experience
              </Text>
            </VStack>

            {/* Appearance Section */}
            <VStack space="md">
              <Text className="text-lg font-heading font-semibold text-typography-900">
                Appearance
              </Text>
              <HStack className="items-center justify-between py-3">
                <HStack className="items-center">
                  <Icon name="moon" size={16} variant="primary" className="mr-3" />
                  <Text className="font-body text-typography-900">Dark Mode</Text>
                </HStack>
                {/* Theme toggle is in top right, this could be a duplicate or different control */}
                <Switch value={false} onValueChange={() => {}} />
              </HStack>
            </VStack>

            <Divider />

            {/* Notifications Section */}
            <VStack space="md">
              <Text className="text-lg font-heading font-semibold text-typography-900">
                Notifications
              </Text>
              <HStack className="items-center justify-between py-3">
                <HStack className="items-center">
                  <Icon name="bell" size={16} variant="primary" className="mr-3" />
                  <Text className="font-body text-typography-900">Push Notifications</Text>
                </HStack>
                <Switch value={notifications} onValueChange={setNotifications} />
              </HStack>
            </VStack>

            <Divider />

            {/* Privacy Section */}
            <VStack space="md">
              <Text className="text-lg font-heading font-semibold text-typography-900">
                Privacy
              </Text>
              <HStack className="items-center justify-between py-3">
                <HStack className="items-center">
                  <Icon name="bar-chart" size={16} variant="primary" className="mr-3" />
                  <Text className="font-body text-typography-900">Analytics</Text>
                </HStack>
                <Switch value={analytics} onValueChange={setAnalytics} />
              </HStack>

              <Pressable className="py-3">
                <HStack className="items-center">
                  <Icon name="lock" size={16} variant="primary" className="mr-3" />
                  <Text className="font-body text-typography-900">Privacy Policy</Text>
                  <Icon name="chevron-right" size={14} variant="secondary" className="ml-auto" />
                </HStack>
              </Pressable>
            </VStack>

            <Divider />

            {/* Support Section */}
            <VStack space="md">
              <Text className="text-lg font-heading font-semibold text-typography-900">
                Support
              </Text>
              <Pressable className="py-3">
                <HStack className="items-center">
                  <Icon name="question-circle" size={16} variant="primary" className="mr-3" />
                  <Text className="font-body text-typography-900">Help & FAQ</Text>
                  <Icon name="chevron-right" size={14} variant="secondary" className="ml-auto" />
                </HStack>
              </Pressable>

              <Pressable className="py-3">
                <HStack className="items-center">
                  <Icon name="envelope" size={16} variant="primary" className="mr-3" />
                  <Text className="font-body text-typography-900">Contact Us</Text>
                  <Icon name="chevron-right" size={14} variant="secondary" className="ml-auto" />
                </HStack>
              </Pressable>
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}