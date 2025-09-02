import { useDittoIncident } from '@/hooks/use-ditto-incident';
import { useMeshStatus } from '@/hooks/use-mesh-status';
import type { IncidentDittoContextValue } from '@/types/incident';
import type { Ditto } from '@dittolive/ditto';
import React, { createContext, ReactNode, useContext } from 'react';

// Create the context
export const IncidentDittoContext = createContext<IncidentDittoContextValue | null>(null);

// Provider props - no longer needs incidentKey
export interface IncidentDittoProviderProps {
  children: ReactNode;
}

// Provider component - simplified
export const IncidentDittoProvider: React.FC<IncidentDittoProviderProps> = ({ 
  children 
}) => {
  const { ditto, isInitialized, error, currentIncident } = useDittoIncident();
  const { isConnected } = useMeshStatus(ditto, isInitialized, currentIncident);

  const contextValue: IncidentDittoContextValue = {
    ditto,
    isInitialized,
    error,
    currentIncident,
    isConnected,
  };

  return (
    <IncidentDittoContext.Provider value={contextValue}>
      {children}
    </IncidentDittoContext.Provider>
  );
};

// Hook to use the context
export const useIncidentDitto = (): IncidentDittoContextValue => {
  const context = useContext(IncidentDittoContext);
  if (!context) {
    throw new Error('useIncidentDitto must be used within an IncidentDittoProvider');
  }
  return context;
};

// Hook to get Ditto instance (throws if not initialized)
export const useDitto = (): Ditto => {
  const { ditto, isInitialized, error } = useIncidentDitto();
  
  if (error) {
    throw new Error(`Ditto initialization failed: ${error}`);
  }
  
  if (!isInitialized || !ditto) {
    throw new Error('Ditto is not initialized yet');
  }
  
  return ditto;
};

// Hook for optional Ditto instance (returns null if not ready)
export const useDittoOptional = (): Ditto | null => {
  const { ditto, isInitialized, error } = useIncidentDitto();
  
  if (error || !isInitialized) {
    return null;
  }
  
  return ditto;
};