import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useDittoOptional } from '@/context/incident-ditto-context';
import React from 'react';

export function OptionalSyncComponent() {
  const ditto = useDittoOptional();
  
  if (!ditto) {
    return (
      <VStack className="items-center p-4">
        <Text className="text-gray-500">Waiting for incident connection...</Text>
      </VStack>
    );
  }

  return (
    <VStack className="items-center p-4">
      <Text className="text-green-600">✅ Connected to incident mesh</Text>
      <Text className="text-xs text-gray-500 mt-1">
        Ready for offline synchronization
      </Text>
    </VStack>
  );
}