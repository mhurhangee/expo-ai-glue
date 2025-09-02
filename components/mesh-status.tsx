// components/MeshStatusDisplay.tsx
import { MeshHealthDot } from '@/components/mesh-health-dot';
import { Badge, BadgeText } from '@/components/ui/badge';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useDittoPresence } from '@/hooks/use-ditto-presence';
import React from 'react';

export const MeshStatus = () => {
  const status = useDittoPresence();

  if (!status) {
    return (
      <HStack className="items-center space-x-2">
        <Spinner size="small" />
        <Text>Loading mesh status...</Text>
      </HStack>
    );
  }

  // Determine health
  let healthVariant: 'success' | 'warning' | 'error' = 'error';
  if (status.connectedToCloud && status.activeConnections > 0) {
    healthVariant = 'success';
  } else if (status.activeConnections > 0) {
    healthVariant = 'warning';
  }

  return (
    <Box className="bg-backgroundLight p-4 rounded-md">
      <VStack space="sm">
        {/* Health + Cloud Status */}
        <HStack className="items-center justify-between">
          <Text className="font-bold">Cloud:</Text>
          <HStack className="items-center space-x-2">
            <MeshHealthDot />
            <Text>{status.connectedToCloud ? 'Connected' : 'Disconnected'}</Text>
          </HStack>
        </HStack>

        {/* Local Device */}
        <HStack className="justify-between">
          <Text className="font-bold">Device:</Text>
          <Text>{status.localPeerName}</Text>
        </HStack>

        {/* Remote Peers */}
        <HStack className="justify-between">
          <Text className="font-bold">Remote Peers:</Text>
          <Badge variant="solid">
            <BadgeText>{status.numberOfRemotePeers}</BadgeText>
          </Badge>
        </HStack>

        {/* Active Connections */}
        <HStack className="justify-between">
          <Text className="font-bold">Connections:</Text>
          <Badge variant="outline">
            <BadgeText>{status.activeConnections}</BadgeText>
          </Badge>
        </HStack>

        {/* Remote Peer Names */}
        {status.remotePeerNames.length > 0 && (
          <VStack space="1">
            <Text className="font-bold">Peers:</Text>
            <HStack className="flex-wrap space-x-2">
              {status.remotePeerNames.map((name) => (
                <Badge key={name} variant="subtle">
                  <BadgeText>{name}</BadgeText>
                </Badge>
              ))}
            </HStack>
          </VStack>
        )}
      </VStack>
    </Box>
  );
};
