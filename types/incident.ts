import type { Ditto } from '@dittolive/ditto';

export interface DittoIncidentState {
  ditto: Ditto | null;
  isInitialized: boolean;
  error: string | null;
  currentIncident: string | null;
}

export interface IncidentDittoContextValue extends DittoIncidentState {
  isConnected: boolean;
}

export interface MeshStatus {
  connectedPeers: number;
  deviceName: string;
  connections: number;
  isConnected: boolean;
  currentIncident: string | null;
  isActive: boolean;
}

export interface IncidentIdentity {
  type: 'offlinePlayground';
  appID: string;
  offlineToken: string;
}

export interface IncidentReport {
  _id: string;
  title: string;
  description: string;
  timestamp: string;
  deviceId: string;
  location?: {
    lat: number;
    lng: number;
  };
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'resolved';
}