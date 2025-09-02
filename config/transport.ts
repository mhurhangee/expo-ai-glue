import { TransportConfig } from '@dittolive/ditto';
import { Platform } from 'react-native';

/**
 * Emergency transport configuration for Ditto mesh networking
 * Based on the working example provided
 */
export function createEmergencyTransportConfig(): TransportConfig {
  const transportsConfig = new TransportConfig();
  
  // Enable peer-to-peer transports for offline mesh networking
  transportsConfig.peerToPeer.bluetoothLE.isEnabled = true;
  transportsConfig.peerToPeer.lan.isEnabled = true;
  transportsConfig.peerToPeer.lan.isMdnsEnabled = true;
  transportsConfig.peerToPeer.lan.isMulticastEnabled = true;

  // Apple Wireless Direct Link is only available on Apple devices
  if (Platform.OS === 'ios') {
    transportsConfig.peerToPeer.awdl.isEnabled = true;
  }

  return transportsConfig;
}