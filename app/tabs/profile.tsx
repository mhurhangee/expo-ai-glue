import { Icon } from '@/components/icon';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { SafeAreaView, ScrollView } from 'react-native';

export default function ProfileTab() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <Box className="flex-1 px-6 py-8">

          <VStack space="xl">
            {/* Profile Header */}
            <VStack space="md" className="items-center">
              <Avatar size="xl">
                <AvatarFallbackText>MH</AvatarFallbackText>
              </Avatar>
              <VStack space="xs" className="items-center">
                <Heading className="text-2xl font-heading font-bold text-typography-900">
                  Your Name
                </Heading>
                <Text className="font-body text-typography-600">
                  m.hurhangee@me.com
                </Text>
              </VStack>
            </VStack>

            {/* Stats */}
            <HStack space="md" className="justify-center">
              <VStack space="xs" className="items-center">
                <Text className="font-mono text-2xl font-bold text-typography-900">12</Text>
                <Text className="font-body text-sm text-typography-600">Posts</Text>
              </VStack>
              <VStack space="xs" className="items-center">
                <Text className="font-mono text-2xl font-bold text-typography-900">156</Text>
                <Text className="font-body text-sm text-typography-600">Followers</Text>
              </VStack>
              <VStack space="xs" className="items-center">
                <Text className="font-mono text-2xl font-bold text-typography-900">89</Text>
                <Text className="font-body text-sm text-typography-600">Following</Text>
              </VStack>
            </HStack>

            {/* Actions */}
            <VStack space="sm">
              <Button variant="outline" action="primary">
                <Icon name="edit" size={16} variant="primary" className="mr-2" />
                <ButtonText>Edit Profile</ButtonText>
              </Button>
              <Button variant="outline" action="secondary">
                <Icon name="share" size={16} variant="primary" className="mr-2" />
                <ButtonText>Share Profile</ButtonText>
              </Button>
            </VStack>

            {/* Recent Activity */}
            <VStack space="md">
              <Text className="text-xl font-heading font-semibold text-typography-900">
                Recent Activity
              </Text>
              <Box className="bg-background-100 p-4 rounded-lg">
                <Text className="font-body text-typography-700">
                  No recent activity to show.
                </Text>
              </Box>
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}