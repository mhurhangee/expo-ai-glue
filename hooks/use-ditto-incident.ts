import { createEmergencyTransportConfig } from '@/config/transport';
import type { DittoIncidentState } from '@/types/incident';
import { incidentLogger, logMeshStatus } from '@/utils/logger';
import { Ditto, init } from '@dittolive/ditto';
import { useEffect, useState } from 'react';

// Fixed incident key - set this to whatever you want
const INCIDENT_KEY = 'DEMO-INCIDENT-2024';

// Singleton to prevent multiple Ditto instances
let globalDittoInstance: Ditto | null = null;

/**
 * Hook to initialize Ditto with a fixed incident key.
 * Simple, reliable, no dynamic switching.
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
        // Stop existing instance
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

        incidentLogger.joining(INCIDENT_KEY);
        
        // Initialize Ditto SDK
        await init();
        
        // Create identity with fixed incident key
        const identity = {
          type: 'offlinePlayground' as const,
          appID: `incident-${INCIDENT_KEY}`,
        };
        
        const token = 'o2d1c2VyX2lkdTEwMTE0MTAzOTQ3Mzk1MjI5MjA1NmZleHBpcnl4GDIwMjUtMDktMzBUMjI6NTk6NTkuOTk5WmlzaWduYXR1cmV4WFRudUdIb2x6TEx2QjVqcjExMXZLaFV6NzFSRVRMV1B2RDZnd0o0UEQ4WU1ibWxpKzlYdnlTOGNjeVBMQnhabHVOclZPeGY5amNOUzR5ekFiSm45a2hRPT0=';
        
        console.log(`Creating Ditto instance for: ${INCIDENT_KEY}`);
        const dittoInstance = new Ditto(identity);

        // Set offline license token
        try {
          dittoInstance.setOfflineOnlyLicenseToken(token);
          console.log('Offline license token set successfully');
        } catch (licenseError) {
          console.error('License error:', licenseError);
          // Continue anyway - might work without license in development
        }

        // Configure transports
        const transportConfig = createEmergencyTransportConfig();
        dittoInstance.setTransportConfig(transportConfig);
        console.log('Emergency transports configured');

        // Start sync
        dittoInstance.startSync();
        incidentLogger.initialized(INCIDENT_KEY);

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
        incidentLogger.error(INCIDENT_KEY, errorMessage);
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