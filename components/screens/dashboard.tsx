import { MeshStatus } from '@/components/mesh-status';
import { VStack } from '@/components/ui/vstack';
import { useDitto } from '@/context/ditto-context';
import React from 'react';
import { ErrorScreen } from './error';

export default function DashboardScreen() {
  const { ditto } = useDitto();

  if (!ditto) {
    return (
        <ErrorScreen errorMessage="No ditto instance found" />
    );
  }


  return (
    <VStack space="md" className="p-4">
        <MeshStatus />
    </VStack>
  );
}