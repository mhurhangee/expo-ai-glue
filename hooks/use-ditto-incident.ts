import { createEmergencyTransportConfig } from '@/config/transport';
import type { DittoIncidentState } from '@/types/incident';
import { logMeshStatus } from '@/utils/logger';
import { Ditto, init } from '@dittolive/ditto';
import { useEffect, useState } from 'react';

// For demo, use a hardcoded incident name. In production, this should be secure.
const INCIDENT_KEY = process.env.EXPO_PUBLIC_INCIDENT_NAME || 'DEMO-INCIDENT-2025';

// Singleton to prevent multiple Ditto instances
let globalDittoInstance: Ditto | null = null;

/**
 * Hook to initialize Ditto with a fixed incident key.
 */
export const useDittoIncident = (): DittoIncidentState => {
  const [state, setState] = useState<DittoIncidentState>({
    ditto: null,
    isInitialized: false,
    error: null,
    currentIncident: INCIDENT_KEY,
  });

  useEffect(() => {
    const initializeDitto = async () => {
      try {
        // If singleton Ditto instance exists, stop it
        if (globalDittoInstance) {
          console.log('Stopping existing Ditto instance');
          try {
            // TODO: update to presence.observe.
            globalDittoInstance.stopSync();
            globalDittoInstance = null;
            // Give a small delay to ensure cleanup
            await new Promise<void>(resolve => setTimeout(() => resolve(), 100));
          } catch (error) {
            console.warn('Error stopping existing Ditto instance:', error);
          }
        }
        
        // Initialize Ditto SDK
        await init();
        
        // Create identity with fixed incident key
        const identity = {
          // Use offlinePlayground for demo to mimic sharedKey behaviour (i.e. no online connectivity ever needed, and a key could be shared around responders)
          // In production, use sharedKey with a secure key management system.  N.b. requires a license.
          type: 'offlinePlayground' as const,
          appID: `incident-${INCIDENT_KEY}`,
        };
        
        // For demo, use a public offline token. In production, this should be secure.
        const token = process.env.EXPO_PUBLIC_OFFLINE_TOKEN || '';
        console.log("Using incident offline token which is not secured.");
        
        const dittoInstance = new Ditto(identity);

        // Set offline license token
        try {
          dittoInstance.setOfflineOnlyLicenseToken(token);
          console.log('Offline license token set successfully');
        } catch (licenseError) {
          // Continue anyway - might work without license in development
          console.error('License error:', licenseError);
        }

        // Configure transports
        const transportConfig = createEmergencyTransportConfig();
        dittoInstance.setTransportConfig(transportConfig);

        // Start sync
        dittoInstance.startSync();

        // Log mesh status after brief delay
        setTimeout(() => {
          logMeshStatus(dittoInstance, INCIDENT_KEY);
        }, 2000);

        globalDittoInstance = dittoInstance;
        setState({
          ditto: dittoInstance,
          isInitialized: true,
          error: null,
          currentIncident: INCIDENT_KEY,
        });

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Ditto initialization failed:', errorMessage);
        
        setState({
          ditto: null,
          isInitialized: false,
          error: `Failed to initialize: ${errorMessage}`,
          currentIncident: INCIDENT_KEY,
        });
      }
    };

    initializeDitto();
  }, []); // Only run once

  return state;
};