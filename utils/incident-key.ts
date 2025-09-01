// utils/ditto-key.ts
import type { IncidentIdentity } from '@/types/incident';

/**
 * Derives a consistent shared key from an incident identifier.
 * 
 * ⚠️ WARNING: This is a demo implementation for development only!
 * 
 * In production, you should:
 * 1. Use pre-distributed keys from secure storage
 * 2. Use proper key derivation with a master secret
 * 3. Use the ditto-authtool to generate proper shared keys
 * 4. Contact Ditto support for offline license tokens
 */
export async function deriveIncidentKey(incidentKey: string): Promise<string> {
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(`incident-mesh-shared-key-${incidentKey}`);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    console.log('⚠️ Using demo key derivation - replace with proper Ditto shared key in production');
    return hashHex;
  } catch (error) {
    console.error('Key derivation failed:', error);
    // Fallback to simple encoding
    return Buffer.from(`incident-${incidentKey}`, 'utf-8').toString('base64');
  }
}

/**
 * Creates a Ditto identity for a specific incident
 */
export async function createIncidentIdentity(incidentKey: string): Promise<IncidentIdentity> {
  const sharedKey = await deriveIncidentKey(incidentKey);
  
  return {
    type: 'sharedKey',
    appID: `incident-${incidentKey}`,
    sharedKey,
  };
}

/**
 * Validates an incident key format
 */
export function validateIncidentKey(key: string): boolean {
  const trimmed = key.trim();
  
  // Basic validation - customize as needed
  if (trimmed.length < 3) return false;
  if (trimmed.length > 50) return false;
  
  // Only alphanumeric, hyphens, and underscores
  const validFormat = /^[A-Za-z0-9\-_]+$/.test(trimmed);
  return validFormat;
}

/**
 * Normalizes incident key format
 */
export function normalizeIncidentKey(key: string): string {
  return key.trim().toUpperCase();
}