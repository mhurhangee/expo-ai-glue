import { useDitto } from '@/context/ditto-context';
import type { PresenceGraph } from '@dittolive/ditto';
import { useEffect, useState } from 'react';

type MeshStatus = {
  localPeerName: string;
  connectedToCloud: boolean;
  numberOfRemotePeers: number;
  activeConnections: number;
  remotePeerNames: string[];
};

export const useDittoPresence = () => {
  const { ditto } = useDitto();
  const [status, setStatus] = useState<MeshStatus | null>(null);

  useEffect(() => {
    if (!ditto) return;

    const observer = ditto.presence.observe((graph: PresenceGraph) => {
      const local = graph.localPeer;
      const remoteNames = graph.remotePeers.map((peer) => peer.deviceName);

      setStatus({
        localPeerName: local.deviceName,
        connectedToCloud: local.isConnectedToDittoCloud,
        numberOfRemotePeers: graph.remotePeers.length,
        activeConnections: local.connections.length,
        remotePeerNames: remoteNames,
      });
    });

    return () => observer.stop();
  }, [ditto]);

  return status;
};
