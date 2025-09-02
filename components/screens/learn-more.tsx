import { BackButton } from '@/components/back-button';
import { Icon } from '@/components/icon';
import { LearnMoreAccordionItem } from '@/components/learn-more-accordion';
import { ThemeToggle } from '@/components/theme-toggle';
import { Accordion } from '@/components/ui/accordion';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { LEARN_MORE_DATA } from '@/constants/learn-more';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

export default function LearnMoreScreen() {
    const handleGoBack = () => {
        router.back();
    };

    return (
        <SafeAreaView className="flex-1">
            <ScrollView>
                {/* Header with gradient background */}
                <Box className="pt-6 px-6 relative">
                    {/* Header controls */}
                    <HStack className="justify-between items-center mb-6">
                        <BackButton />
                        <ThemeToggle />
                    </HStack>
                </Box>

                <Box className="px-6 py-6">
                        {/* FAQ Section */}
                        <VStack space="md" className="mb-8">
                            <VStack space="sm" className="mb-4">
                                <Heading className="text-3xl font-heading font-bold">
                                    Learn More
                                </Heading>
                                <Text className="text-base font-body">
                                    Everything you need to know about Incident Mesh
                                </Text>
                            </VStack>
                            <Accordion
                                variant="unfilled"
                                type="single"
                                isCollapsible={true}
                                className="w-full"
                            >
                                {LEARN_MORE_DATA.map((learnMoreItem) => (
                                    <LearnMoreAccordionItem 
                                        key={learnMoreItem.id} 
                                        learnMoreItem={learnMoreItem} 
                                    />
                                ))}
                            </Accordion>
                        </VStack>

                        {/* Call to Action */}
                        <Box className="p-6 rounded-xl mb-6">
                            <VStack space="md" className="items-center text-center">
                                <Icon name="play" size={24} className="text-white" />
                                <VStack space="sm" className="items-center">
                                    <Text className="text-xl font-heading font-bold text-white">
                                        Ready to try?
                                    </Text>
                                    <Text className="text-primary-100 font-body text-center leading-relaxed">
                                        Join Incident Mesh to respond faster and learn from every incident.
                                    </Text>
                                </VStack>
                                <HStack space="md" className="flex-wrap justify-center mt-2">
                                    <Button 
                                        variant="solid" 
                                        action="primary"
                                        className="min-w-32"
                                        onPress={() => router.push('/tabs/dashboard')}
                                    >
                                        <ButtonText className="font-semibold">
                                            Try Demo
                                        </ButtonText>
                                    </Button>
                                </HStack>
                            </VStack>
                        </Box>

                        {/* Back button */}
                        <Button 
                            onPress={handleGoBack} 
                            variant="solid" 
                            action="secondary" 
                            className="mb-6"
                        >
                            <Icon name="arrow-left" size={16} variant="secondary" className="mr-2" />
                            <ButtonText>Back</ButtonText>
                        </Button>
                    </Box>
                </ScrollView>
            </SafeAreaView>
    );
}