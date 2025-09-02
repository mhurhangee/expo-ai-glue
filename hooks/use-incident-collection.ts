import { incidentLogger } from '@/utils/logger';
import type { Ditto } from '@dittolive/ditto';
import { useEffect, useState } from 'react';

interface CollectionState {
  collectionName: string;
  error: string | null;
}

/**
 * Hook for accessing Ditto collections using DQL
 * Returns collection name for use with DQL queries
 */
export const useDittoCollection = (
  ditto: Ditto | null, 
  collectionName: string
): CollectionState => {
  const [state, setState] = useState<CollectionState>({
    collectionName: '',
    error: null,
  });

  useEffect(() => {
    if (!ditto) {
      setState({ collectionName: '', error: null });
      return;
    }

    try {
      // With DQL, we don't need to "get" the collection
      // We just use the collection name in DQL queries
      setState({ collectionName, error: null });
      incidentLogger.collection(collectionName);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setState({
        collectionName: '',
        error: `Failed to setup collection ${collectionName}: ${errorMsg}`,
      });
      console.error(`❌ Collection error:`, errorMsg);
    }
  }, [ditto, collectionName]);

  return state;
};

/**
 * Hook for live queries using DQL registerObserver
 */
export const useDittoLiveQuery = <T = any>(
  ditto: Ditto | null,
  collectionName: string,
  whereClause: string = ''
) => {
  const [documents, setDocuments] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ditto || !collectionName) {
      setDocuments([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Build DQL query
      const whereQuery = whereClause ? `WHERE ${whereClause}` : '';
      const query = `SELECT * FROM ${collectionName} ${whereQuery}`;
      
      console.log('Registering DQL observer:', query);
      
      // Use DQL registerObserver instead of legacy observe
      const observer = ditto.store.registerObserver(query, (result) => {
        const docs = result.items.map(item => {
          // Convert DQL result item to document object
          const jsonString = item.jsonString();
          return jsonString ? JSON.parse(jsonString) : null;
        }).filter(Boolean);
        
        setDocuments(docs);
        setIsLoading(false);
        incidentLogger.sync(collectionName, docs.length);
      });

      return () => {
        observer.cancel();
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Query failed';
      setError(errorMsg);
      setIsLoading(false);
      console.error('❌ Live query error:', errorMsg);
    }
  }, [ditto, collectionName, whereClause]);

  return { documents, isLoading, error };
};

/**
 * Hook for executing DQL upsert operations
 */
export const useDittoUpsert = (ditto: Ditto | null, collectionName: string) => {
  const upsert = async (document: any) => {
    if (!ditto) {
      throw new Error('Ditto not initialized');
    }

    try {
      // Use DQL INSERT ... DO UPDATE syntax
      const query = `INSERT INTO ${collectionName} DOCUMENTS (:doc) ON ID CONFLICT DO UPDATE`;
      await ditto.store.execute(query, { doc: document });
      incidentLogger.report('added');
    } catch (error) {
      console.error('❌ Failed to upsert document:', error);
      throw error;
    }
  };

  return { upsert };
};