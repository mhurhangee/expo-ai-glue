import type { Ditto } from '@dittolive/ditto';

/**
 * Logs the current mesh network status for diagnostics
 */
export function logMeshStatus(ditto: Ditto, incidentKey: string): void {
  try {
    const graph = ditto.presence.graph;
    const localPeer = graph.localPeer;
    const remotePeers = graph.remotePeers;
    
    console.log(`🚨 INCIDENT ${incidentKey} MESH STATUS:`, {
      incident: incidentKey,
      device: localPeer.deviceName,
      connectedResponders: remotePeers.length,
      activeConnections: localPeer.connections.length,
      meshStatus: localPeer.connections.length > 0 ? 'CONNECTED' : 'STANDALONE',
      appID: `incident-${incidentKey}`,
      peerDevices: remotePeers.map(peer => peer.deviceName),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to log mesh status:', error);
  }
}

/**
 * Logs incident mesh lifecycle events
 */
export const incidentLogger = {
  joining: (incidentKey: string) => 
    console.log(`🚨 Joining incident mesh: ${incidentKey}`),
    
  initialized: (incidentKey: string) => 
    console.log(`✅ Incident mesh active for: ${incidentKey}`),
    
  leaving: (incidentKey: string) => 
    console.log(`🔌 Leaving incident: ${incidentKey}`),
    
  error: (incidentKey: string, error: string) => 
    console.error(`❌ Failed to join incident ${incidentKey}:`, error),
    
  cleanup: (incidentKey: string | null) => 
    console.log(`🧹 Cleaning up incident mesh: ${incidentKey}`),
    
  collection: (name: string) => 
    console.log(`📚 Connected to collection: ${name}`),
    
  sync: (collectionName: string, count: number) => 
    console.log(`📊 Synced ${count} documents in ${collectionName}`),
    
  report: (action: string) => 
    console.log(`✅ Report ${action} and syncing to mesh`),
};