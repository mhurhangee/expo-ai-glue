import { Badge, BadgeText } from '@/components/ui/badge';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useIncidentDitto } from '@/context/incident-ditto-context';
import { useIncidentMeshStatus } from '@/hooks/use-incident-mesh-status';
import React from 'react';

export function IncidentDashboard() {
  const { currentIncident, error } = useIncidentDitto();
  const { connectedPeers, deviceName, isConnected, isActive } = useIncidentMeshStatus();

  if (error) {
    return (
      <VStack space="md" className="p-4">
        <Text className="text-red-500">❌ {error}</Text>
      </VStack>
    );
  }

  if (!isActive) {
    return (
      <VStack space="md" className="p-4">
        <Text>No active incident</Text>
      </VStack>
    );
  }

  return (
    <VStack space="md" className="p-4">
      <Text className="text-2xl font-bold">🚨 {currentIncident}</Text>
      <Text>Device: {deviceName}</Text>
      
      <HStack space="md">
        <Badge variant={isConnected ? 'success' : 'warning'}>
          <BadgeText>
            {isConnected ? '🟢 Connected' : '🟡 Standalone'}
          </BadgeText>
        </Badge>
        
        <Badge variant="outline">
          <BadgeText>
            {connectedPeers} Responders
          </BadgeText>
        </Badge>
      </HStack>
    </VStack>
  );
}