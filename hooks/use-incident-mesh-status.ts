// hooks/use-incident-mesh-status.ts
import { useIncidentDitto } from '@/context/incident-ditto-context';
import { useMeshStatus } from '@/hooks/use-mesh-status';
import type { MeshStatus } from '@/types/incident';

/**
 * Convenience hook that combines incident context with mesh status
 */
export const useIncidentMeshStatus = (): MeshStatus => {
  const { ditto, isInitialized, currentIncident } = useIncidentDitto();
  return useMeshStatus(ditto, isInitialized, currentIncident);
};