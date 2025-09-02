// context/DittoContext.tsx
import { Ditto, init } from '@dittolive/ditto';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type DittoContextValue = {
  ditto: Ditto | null;
  isInitialized: boolean;
  error: string | null;
};

const DittoContext = createContext<DittoContextValue>({
  ditto: null,
  isInitialized: false,
  error: null,
});

let globalDittoInstance: Ditto | null = null;
let globalPresenceObserver: any = null;

export const DittoProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<DittoContextValue>({
    ditto: null,
    isInitialized: false,
    error: null,
  });

  useEffect(() => {
    const initializeDitto = async () => {
      try {
        if (globalDittoInstance) {
          globalPresenceObserver?.stop();
          await globalDittoInstance.close();
          globalDittoInstance = null;
          globalPresenceObserver = null;
        }

        await init();

        const appID = process.env.EXPO_PUBLIC_DITTO_APP_ID!;
        const token = process.env.EXPO_PUBLIC_DITTO_TOKEN!;
        const customAuthURL = process.env.EXPO_PUBLIC_DITTO_AUTH_URL!;
        const wsURL = process.env.EXPO_PUBLIC_DITTO_WS_URL!;

        const dittoInstance = new Ditto({
          type: 'onlinePlayground',
          appID,
          token,
          customAuthURL,
          enableDittoCloudSync: false, // required for playground
        });

        // Configure WebSocket URL
        dittoInstance.updateTransportConfig((config) => {
          config.connect.websocketURLs.push(wsURL);
        });

        // Optional: disable DQL strict mode (useful in playground)
        await dittoInstance.store.execute(
          "ALTER SYSTEM SET DQL_STRICT_MODE = false"
        );

        // Observe peers
        globalPresenceObserver = dittoInstance.presence.observe(() => {});

        globalDittoInstance = dittoInstance;

        setState({
          ditto: dittoInstance,
          isInitialized: true,
          error: null,
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        setState({
          ditto: null,
          isInitialized: false,
          error: message,
        });
      }
    };

    void initializeDitto();

    return () => {
      globalPresenceObserver?.stop();
      globalDittoInstance?.close();
      globalDittoInstance = null;
      globalPresenceObserver = null;
    };
  }, []);

  return <DittoContext.Provider value={state}>{children}</DittoContext.Provider>;
};

export const useDitto = () => useContext(DittoContext);
