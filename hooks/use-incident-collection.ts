// hooks/use-ditto-collection.ts
import { incidentLogger } from '@/utils/logger';
import type { Ditto } from '@dittolive/ditto';
import { useEffect, useState } from 'react';

interface CollectionState {
  collection: any;
  error: string | null;
}

/**
 * Hook for accessing Ditto collections with automatic error handling
 */
export const useDittoCollection = (
  ditto: Ditto | null, 
  collectionName: string
): CollectionState => {
  const [state, setState] = useState<CollectionState>({
    collection: null,
    error: null,
  });

  useEffect(() => {
    if (!ditto) {
      setState({ collection: null, error: null });
      return;
    }

    try {
      const collection = ditto.store.collection(collectionName);
      setState({ collection, error: null });
      incidentLogger.collection(collectionName);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setState({
        collection: null,
        error: `Failed to access collection ${collectionName}: ${errorMsg}`,
      });
      console.error(`❌ Collection error:`, errorMsg);
    }
  }, [ditto, collectionName]);

  return state;
};

/**
 * Hook for live queries with automatic document updates
 */
export const useDittoLiveQuery = <T = any>(
  collection: any,
  queryFn?: (collection: any) => any
) => {
  const [documents, setDocuments] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collection) {
      setDocuments([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const query = queryFn ? queryFn(collection) : collection.findAll();
      
      const liveQuery = query.observe((docs: T[]) => {
        setDocuments(docs);
        setIsLoading(false);
        incidentLogger.sync(collection.name, docs.length);
      });

      return () => {
        liveQuery.stop();
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Query failed';
      setError(errorMsg);
      setIsLoading(false);
      console.error('❌ Live query error:', errorMsg);
    }
  }, [collection, queryFn]);

  return { documents, isLoading, error };
};