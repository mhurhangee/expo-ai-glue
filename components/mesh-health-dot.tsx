// components/MeshHealthIndicator.tsx
import { Icon } from '@/components/icon';
import { useDittoPresence } from '@/hooks/use-ditto-presence';

export const MeshHealthDot = () => {
  const status = useDittoPresence();

  if (status) {
    if (status.connectedToCloud && status.activeConnections > 0) {
      return <Icon name="wifi" size={20} variant="positive" />;
    } else if (status.activeConnections > 0) {
      return <Icon name="wifi" size={20} variant="muted" />;
    } else {
      return <Icon name="wifi-off" size={20} variant="negative" />;
    }
  }

  return <Icon name="alert-triangle" size={20} variant="negative" />;
};
