// hooks/use-ditto-incident.ts
import { createEmergencyTransportConfig } from '@/config/transport';
import type { DittoIncidentState } from '@/types/incident';
import { createIncidentIdentity } from '@/utils/incident-key';
import { incidentLogger, logMeshStatus } from '@/utils/logger';
import { Ditto, init } from '@dittolive/ditto';
import { useEffect, useState } from 'react';

/**
 * Hook to initialize Ditto for a specific incident using Offline Shared Key authentication.
 * Creates an isolated mesh network for each incident.
 */
export const useDittoIncident = (incidentKey?: string): DittoIncidentState => {
  const [state, setState] = useState<DittoIncidentState>({
    ditto: null,
    isInitialized: false,
    error: null,
    currentIncident: null,
  });

  useEffect(() => {
    // Clean up previous instance if incident key changes
    if (state.ditto && state.currentIncident !== incidentKey) {
      incidentLogger.leaving(state.currentIncident || 'unknown');
      state.ditto.stopSync();
      setState({
        ditto: null,
        isInitialized: false,
        error: null,
        currentIncident: incidentKey || null,
      });
    }

    // Don't initialize without incident key
    if (!incidentKey?.trim()) {
      if (state.ditto || state.isInitialized) {
        setState({
          ditto: null,
          isInitialized: false,
          error: null,
          currentIncident: null,
        });
      }
      return;
    }

    // Skip if already initialized for this incident
    if (state.isInitialized && state.currentIncident === incidentKey) {
      return;
    }

    const initializeIncidentMesh = async () => {
      try {
        incidentLogger.joining(incidentKey);
        
        // Initialize Ditto SDK
        await init();
        
        // Create shared key identity for this specific incident
        const identity = await createIncidentIdentity(incidentKey);
        
        console.log(`📱 Creating mesh instance for incident: ${incidentKey}`);
        const dittoInstance = new Ditto(identity);

        // Configure emergency transport (Bluetooth, WiFi, etc.)
        const transportConfig = createEmergencyTransportConfig();
        dittoInstance.setTransportConfig(transportConfig);
        console.log('✅ Emergency transports configured');

        // Start mesh synchronization
        dittoInstance.startSync();
        incidentLogger.initialized(incidentKey);

        // Log mesh status after brief delay
        setTimeout(() => {
          logMeshStatus(dittoInstance, incidentKey);
        }, 2000);

        setState({
          ditto: dittoInstance,
          isInitialized: true,
          error: null,
          currentIncident: incidentKey,
        });

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        incidentLogger.error(incidentKey, errorMessage);
        
        setState({
          ditto: null,
          isInitialized: false,
          error: `Failed to join incident: ${errorMessage}`,
          currentIncident: incidentKey,
        });
      }
    };

    initializeIncidentMesh();
  }, [incidentKey]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (state.ditto) {
        incidentLogger.cleanup(state.currentIncident);
        state.ditto.stopSync();
      }
    };
  }, []);

  return state;
};