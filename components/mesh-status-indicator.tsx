import { Badge, BadgeText } from '@/components/ui/badge';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { useIncidentMeshStatus } from '@/hooks/use-incident-mesh-status';
import { useTheme } from '@/hooks/use-theme';
import React from 'react';

export function MeshStatusIndicator() {
  const { isConnected, connectedPeers, currentIncident, isActive } = useIncidentMeshStatus();
  const { isDarkMode } = useTheme();

  if (!isActive) {
    return (
      <Box className={`px-4 py-2 border-b ${
        isDarkMode 
          ? 'bg-slate-900 border-slate-800' 
          : 'bg-gray-50 border-gray-200'
      }`}>
        <Text className={`text-sm text-center ${
          isDarkMode ? 'text-slate-400' : 'text-gray-500'
        }`}>
          No active incident
        </Text>
      </Box>
    );
  }

  return (
    <Box className={`px-4 py-3 border-b ${
      isDarkMode 
        ? 'bg-slate-900 border-slate-800' 
        : 'bg-white border-gray-200'
    }`}>
      <HStack className="items-center justify-between">
        <HStack className="items-center flex-1">
          <Text className={`text-sm font-semibold ${
            isDarkMode ? 'text-slate-200' : 'text-gray-900'
          }`}>
            🚨 {currentIncident}
          </Text>
        </HStack>
        
        <HStack className="items-center space-x-2">
          <Badge 
            variant={isConnected ? 'success' : 'warning'} 
            className="text-xs"
          >
            <BadgeText> {isConnected ? `🟢 ${connectedPeers}` : '🟡 Solo'}</BadgeText>
          </Badge>
        </HStack>
      </HStack>
    </Box>
  );
}