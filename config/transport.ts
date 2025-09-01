/**
 * Emergency transport configuration for Ditto mesh networking
 * Configure transports appropriate for emergency response scenarios
 */
export function createEmergencyTransportConfig() {
  return {
    // Enable peer-to-peer transports for offline scenarios
    peerToPeer: {
      // Bluetooth Low Energy for close-range communication
      bluetoothLE: {
        enabled: true,
      },
      // Local Area Network for WiFi connections
      lan: {
        enabled: true,
        mdnsEnabled: true, // For device discovery on local networks
      },
      // AWDL (Apple Wireless Direct Link) on iOS
      awdl: {
        enabled: true,
      },
    },
    
    // Enable connection to Ditto Server when internet is available
    // This allows for initial authentication and broader sync
    connect: {
      websocketURL: 'wss://cloud.ditto.live/ws',
    },
  };
}