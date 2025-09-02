import { Icon, type IconName } from '@/components/icon';
import {
  AccordionContent,
  AccordionContentText,
  AccordionHeader,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Link } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { LearnMoreItem } from '@/constants/learn-more';
import React from 'react';
import { View } from 'react-native';

interface LearnMoreAccordionItemProps {
  learnMoreItem: LearnMoreItem;
}

const renderListContent = (items: string[]) => (
  <VStack space="sm" className="ml-2">
    {items.map((item, index) => (
      <HStack key={index} className="items-start">
        <Icon name="check-circle" size={16} variant="positive" className="mr-3 mt-0.5" />
        <Text className="font-body text-sm text-typography-700 flex-1">{item}</Text>
      </HStack>
    ))}
  </VStack>
);

const renderCodeContent = (items: string[]) => (
  <Box className="p-4 rounded-lg border border-outline-200 dark:border-outline-700">
    <VStack space="xs">
      {items.map((item, index) => (
        <Text key={index} className="font-mono text-sm text-typography-800 dark:text-typography-200">
          {item}
        </Text>
      ))}
    </VStack>
  </Box>
);

const renderMixedContent = (content: any) => (
  <VStack space="md">
    {content.text && (
      <AccordionContentText className="font-body text-sm text-typography-700">
        {content.text}
      </AccordionContentText>
    )}
    
    {content.steps && (
      <VStack space="sm" className="ml-2">
        {content.steps.map((step: string, index: number) => (
          <HStack key={index} className="items-start">
            <Box className="rounded-full w-6 h-6 items-center justify-center mr-3 mt-0.5">
              <Text className="font-bold text-xs text-typography-900">{index + 1}</Text>
            </Box>
            <Text className="font-body text-sm text-typography-700 flex-1">{step}</Text>
          </HStack>
        ))}
      </VStack>
    )}
    
    {content.contacts && (
      <VStack space="sm">
        {content.contacts.map((contact: any, index: number) => (
          <Link key={index} href={contact.url || `mailto:${contact.value}`}>
            <HStack className="items-center py-2">
              <Icon name={contact.icon} size={14} variant="primary" className="mr-3" />
              <Text className="font-body text-sm">
                {contact.value}
              </Text>
            </HStack>
          </Link>
        ))}
      </VStack>
    )}
    
    {content.cta && (
      <Box className="p-4 rounded-lg border-l-4 border-primary-500 mt-4">
        <Text className="font-body font-semibold">
          {content.cta}
        </Text>
      </Box>
    )}
  </VStack>
);

const renderContent = (learnMoreItem: LearnMoreItem) => {
  const { content, type } = learnMoreItem;
  
  switch (type) {
    case 'list':
      return Array.isArray(content) ? renderListContent(content) : null;
    case 'code':
      return Array.isArray(content) ? renderCodeContent(content) : null;
    case 'mixed':
      return typeof content === 'object' ? renderMixedContent(content) : null;
    case 'text':
    default:
      return (
        <AccordionContentText className="font-body text-sm text-typography-700 leading-relaxed">
          {typeof content === 'string' ? content : ''}
        </AccordionContentText>
      );
  }
};

export const LearnMoreAccordionItem: React.FC<LearnMoreAccordionItemProps> = ({ learnMoreItem }) => {
  return (
    <AccordionItem value={learnMoreItem.id} className="rounded-lg mb-3 overflow-hidden">
      <AccordionHeader>
        <AccordionTrigger className="px-4 py-4">
          {({ isExpanded }: { isExpanded: boolean }) => (
            <>
              <HStack className="items-center flex-1">
                  <Icon 
                    name={learnMoreItem.icon as IconName} 
                  size={20} 
                  variant="primary" 
                  className="mr-4" 
                />
                <AccordionTitleText className="font-heading font-bold flex-1">
                  {learnMoreItem.title}
                </AccordionTitleText>
              </HStack>
              <View className="ml-4">
                <Icon 
                  name={isExpanded ? "chevron-up" : "chevron-down"} 
                  size={16} 
                  variant="secondary" 
                />
              </View>
            </>
          )}
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent className="px-4 py-4">
        {renderContent(learnMoreItem)}
      </AccordionContent>
    </AccordionItem>
  );
};