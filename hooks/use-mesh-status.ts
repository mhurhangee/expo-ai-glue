// hooks/use-mesh-status.ts
import type { MeshStatus } from '@/types/incident';
import type { Ditto } from '@dittolive/ditto';
import { useEffect, useState } from 'react';

/**
 * Hook to monitor mesh network status with real-time updates
 */
export const useMeshStatus = (
  ditto: Ditto | null,
  isInitialized: boolean,
  currentIncident: string | null
): MeshStatus => {
  const [meshStats, setMeshStats] = useState({
    connectedPeers: 0,
    deviceName: 'Unknown',
    connections: 0,
  });

  useEffect(() => {
    if (!ditto || !isInitialized) {
      setMeshStats({ 
        connectedPeers: 0, 
        deviceName: 'Unknown', 
        connections: 0 
      });
      return;
    }

    const updateStats = () => {
      try {
        const graph = ditto.presence.graph;
        const localPeer = graph.localPeer;
        setMeshStats({
          connectedPeers: graph.remotePeers.length,
          deviceName: localPeer.deviceName,
          connections: localPeer.connections.length,
        });
      } catch (error) {
        console.error('Error getting mesh stats:', error);
      }
    };

    // Update immediately
    updateStats();

    // Update periodically
    const interval = setInterval(updateStats, 5000);
    
    return () => clearInterval(interval);
  }, [ditto, isInitialized]);

  return {
    ...meshStats,
    isConnected: meshStats.connections > 0,
    currentIncident,
    isActive: isInitialized && !!(ditto && currentIncident),
  };
};