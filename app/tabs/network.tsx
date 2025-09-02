import { Badge, BadgeText } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useIncidentDitto } from '@/context/incident-ditto-context';
import { useIncidentMeshStatus } from '@/hooks/use-incident-mesh-status';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

export default function NetworkScreen() {
  const { ditto, currentIncident, isInitialized } = useIncidentDitto();
  const { 
    connectedPeers, 
    deviceName, 
    connections, 
    isConnected, 
    isActive 
  } = useIncidentMeshStatus();

  const [peerList, setPeerList] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!ditto || !isInitialized) {
      setPeerList([]);
      return;
    }

    const updatePeers = () => {
      try {
        const graph = ditto.presence.graph;
        const peers = graph.remotePeers.map((peer: any) => peer.deviceName);
        setPeerList(peers);
      } catch (error) {
        console.error('Error getting peers:', error);
      }
    };

    updatePeers();
    const interval = setInterval(updatePeers, 3000);
    return () => clearInterval(interval);
  }, [ditto, isInitialized]);

  if (!isActive) {
    return (
      <SafeAreaView className="flex-1">
        <VStack className="items-center justify-center flex-1 p-4">
          <Text className="text-lg text-gray-500">No active incident</Text>
          <Text className="text-sm text-gray-400 mt-2">
            Join an incident to see mesh network status
          </Text>
        </VStack>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="p-4">
        <VStack space="lg">
          
          {/* Network Status */}
          <Card className="p-4">
            <Text className="text-lg font-bold mb-3">Network Status</Text>
            <VStack space="sm">
              <HStack className="justify-between">
                <Text>Incident:</Text>
                <Text className="font-medium">{currentIncident}</Text>
              </HStack>
              
              <HStack className="justify-between">
                <Text>Device:</Text>
                <Text className="font-medium">{deviceName}</Text>
              </HStack>
              
              <HStack className="justify-between">
                <Text>Status:</Text>
                <Badge variant={isConnected ? 'success' : 'warning'}>
                  <BadgeText>{isConnected ? 'Connected' : 'Standalone'}</BadgeText>
                </Badge>
              </HStack>
              
              <HStack className="justify-between">
                <Text>Active Connections:</Text>
                <Text className="font-medium">{connections}</Text>
              </HStack>
              
              <HStack className="justify-between">
                <Text>Connected Peers:</Text>
                <Text className="font-medium">{connectedPeers}</Text>
              </HStack>
            </VStack>
          </Card>

          {/* Peer List */}
          <Card className="p-4">
            <Text className="text-lg font-bold mb-3">Connected Devices</Text>
            {peerList.length > 0 ? (
              <VStack space="sm">
                {peerList.map((peerName, index) => (
                  <HStack key={index} className="items-center p-2 bg-gray-50 rounded">
                    <Text className="text-green-500 mr-2">🟢</Text>
                    <Text className="flex-1">{peerName}</Text>
                    <Text className="text-xs text-gray-500">Online</Text>
                  </HStack>
                ))}
              </VStack>
            ) : (
              <Text className="text-gray-500 text-center py-4">
                No other devices connected
              </Text>
            )}
          </Card>

          {/* Connection Info */}
          <Card className="p-4">
            <Text className="text-lg font-bold mb-3">Connection Details</Text>
            <VStack space="sm">
              <Text className="text-sm text-gray-600">
                This device is using offline mesh networking to sync data with other 
                responders on the same incident. Data syncs automatically when 
                devices are in range via Bluetooth, WiFi, or other configured transports.
              </Text>
              
              {isConnected ? (
                <Text className="text-sm text-green-600">
                  ✅ Currently syncing with {connectedPeers} other device{connectedPeers !== 1 ? 's' : ''}
                </Text>
              ) : (
                <Text className="text-sm text-yellow-600">
                  ⚠️ No other devices in range. Data will sync when devices connect.
                </Text>
              )}
            </VStack>
          </Card>

        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}