import { BackButton } from '@/components/back-button';
import { Icon } from '@/components/icon';
import { ThemeToggle } from '@/components/theme-toggle';
import {
    Accordion,
    AccordionContent,
    AccordionContentText,
    AccordionHeader,
    AccordionItem,
    AccordionTitleText,
    AccordionTrigger
} from '@/components/ui/accordion';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Link } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, View } from 'react-native';

// Reusable FAQ Item component
const FAQAccordionItem = ({
    value,
    icon,
    title,
    children
}: {
    value: string;
    icon: string;
    title: string;
    children: React.ReactNode;
}) => {
    return (
        <AccordionItem value={value}>
            <AccordionHeader>
                <AccordionTrigger>
                    {({ isExpanded }: { isExpanded: boolean }) => (
                        <>
                            <HStack className="items-center flex-1">
                                <Icon name={icon} size={18} variant="primary" className="mr-3" />
                                <AccordionTitleText className="font-body font-semibold">
                                    {title}
                                </AccordionTitleText>
                            </HStack>
                            <View>
                            <Icon name={isExpanded ? "chevron-up" : "chevron-down"} size={14} variant="secondary" />
                            </View>
                        </>
                    )}
                </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
                {children}
            </AccordionContent>
        </AccordionItem>
    );
};

export default function LearnMore() {
    const handleGoBack = () => {
        router.back();
    };

    return (
        <SafeAreaView className="flex-1">
            <Box className="flex-1 px-6 py-8">
                {/* Header controls */}
                <Box className="absolute top-0 right-6 z-10">
                    <ThemeToggle />
                </Box>
                <Box className="absolute top-0 left-6 z-10">
                    <BackButton />
                </Box>

                <Divider className="my-4" />

                <VStack space="xl">
                    {/* Page header */}
                    <VStack space="md">
                        <Heading className="text-3xl font-heading font-bold text-typography-900">
                            Learn More
                        </Heading>
                        <Text className="text-lg font-body text-typography-600">
                            Everything you need to know about this demo app
                        </Text>
                    </VStack>

                    {/* FAQ Accordion */}
                    <Accordion
                        variant="filled"
                        type="single"
                        isCollapsible={true}
                        className="w-full"
                    >
                        <FAQAccordionItem value="demo" icon="mobile" title="What is this demo app?">
                            <AccordionContentText className="font-body text-typography-700">
                                This is a demonstration app showcasing modern React Native development with Expo Router,
                                Gluestack UI v3, and Tailwind CSS. It features dark mode support, custom fonts, and
                                responsive design patterns.
                            </AccordionContentText>
                        </FAQAccordionItem>

                        <FAQAccordionItem value="tech" icon="cog" title="What's the tech stack?">
                            <VStack space="sm">
                                <AccordionContentText className="font-body text-typography-700">
                                    Built with modern tools for cross-platform development:
                                </AccordionContentText>
                                <VStack space="xs" className="ml-4">
                                    <Text className="font-mono text-sm text-typography-600">• React Native & Expo SDK 50+</Text>
                                    <Text className="font-mono text-sm text-typography-600">• Gluestack UI v3 components</Text>
                                    <Text className="font-mono text-sm text-typography-600">• NativeWind (Tailwind for RN)</Text>
                                    <Text className="font-mono text-sm text-typography-600">• Expo Router for navigation</Text>
                                    <Text className="font-mono text-sm text-typography-600">• TypeScript for type safety</Text>
                                    <Text className="font-mono text-sm text-typography-600">• Google Fonts integration</Text>
                                </VStack>
                            </VStack>
                        </FAQAccordionItem>

                        <FAQAccordionItem value="opensource" icon="heart" title="Is this open source?">
                            <VStack space="md">
                                <AccordionContentText className="font-body text-typography-700">
                                    Yes! This project is open source and available on GitHub. Feel free to explore the code,
                                    submit issues, or contribute improvements.
                                </AccordionContentText>
                                <Link href="https://github.com/mhurhangee/expo-ai-glue">
                                    <HStack className="items-center">
                                        <Icon name="github" size={16} variant="primary" className="mr-2" />
                                        <Text className="font-body text-primary-600 underline">
                                            View on GitHub
                                        </Text>
                                    </HStack>
                                </Link>
                            </VStack>
                        </FAQAccordionItem>

                        <FAQAccordionItem value="features" icon="star" title="What features does it include?">
                            <VStack space="sm">
                                <HStack className="items-center">
                                    <Icon name="check" size={14} variant="primary" className="mr-2" />
                                    <Text className="font-body text-typography-700">Dark/Light mode toggle</Text>
                                </HStack>
                                <HStack className="items-center">
                                    <Icon name="check" size={14} variant="primary" className="mr-2" />
                                    <Text className="font-body text-typography-700">Custom Google Fonts (Inter, Space Grotesk)</Text>
                                </HStack>
                                <HStack className="items-center">
                                    <Icon name="check" size={14} variant="primary" className="mr-2" />
                                    <Text className="font-body text-typography-700">Responsive Gluestack UI components</Text>
                                </HStack>
                                <HStack className="items-center">
                                    <Icon name="check" size={14} variant="primary" className="mr-2" />
                                    <Text className="font-body text-typography-700">FontAwesome icon integration</Text>
                                </HStack>
                                <HStack className="items-center">
                                    <Icon name="check" size={14} variant="primary" className="mr-2" />
                                    <Text className="font-body text-typography-700">Modular component architecture</Text>
                                </HStack>
                            </VStack>
                        </FAQAccordionItem>

                        <FAQAccordionItem value="started" icon="rocket" title="How do I get started?">
                            <VStack space="md">
                                <AccordionContentText className="font-body text-typography-700">
                                    Clone the repository and follow these steps:
                                </AccordionContentText>
                                <Box className="bg-background-100 p-4 rounded-lg">
                                    <VStack space="xs">
                                        <Text className="font-mono text-sm text-typography-800">git clone [repo-url]</Text>
                                        <Text className="font-mono text-sm text-typography-800">npm install</Text>
                                        <Text className="font-mono text-sm text-typography-800">npx expo start</Text>
                                    </VStack>
                                </Box>
                            </VStack>
                        </FAQAccordionItem>

                        <FAQAccordionItem value="contact" icon="envelope" title="Have questions or feedback?">
                            <VStack space="md">
                                <AccordionContentText className="font-body text-typography-700">
                                    I'd love to hear from you! Reach out through any of these channels:
                                </AccordionContentText>
                                <VStack space="sm">
                                    <Link href="mailto:m.hurhangee@me.com">
                                        <HStack className="items-center">
                                            <Icon name="envelope" size={16} variant="primary" className="mr-3" />
                                            <Text className="font-body text-primary-600">m.hurhangee@me.com</Text>
                                        </HStack>
                                    </Link>
                                    <Link href="https://github.com/mhurhangee/expo-ai-glue">
                                        <HStack className="items-center">
                                            <Icon name="github" size={16} variant="primary" className="mr-3" />
                                            <Text className="font-body text-primary-600">GitHub Repository</Text>
                                        </HStack>
                                    </Link>
                                </VStack>
                            </VStack>
                        </FAQAccordionItem>

                    </Accordion>

                    {/* Bottom action */}
                    <Button onPress={handleGoBack} variant="outline" action="secondary" className="mt-8">
                        <Icon name="arrow-left" size={16} variant="primary" className="mr-2" />
                        <ButtonText>Back</ButtonText>
                    </Button>
                </VStack>
            </Box>
        </SafeAreaView>
    );
}