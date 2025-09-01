import { Badge } from '@/components/ui/badge';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { useDitto } from '@/context/incident-ditto-context';
import { useDittoCollection, useDittoLiveQuery } from '@/hooks/use-incident-collection';
import type { IncidentReport } from '@/types/incident';
import { incidentLogger } from '@/utils/logger';
import React, { useState } from 'react';

export function IncidentReports() {
  const ditto = useDitto();
  const { collection, error } = useDittoCollection(ditto, 'incident_reports');
  const { documents: reports, isLoading } = useDittoLiveQuery<IncidentReport>(collection);
  
  const [newReport, setNewReport] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
  });

  const addReport = async () => {
    if (!collection || !newReport.title.trim()) return;

    try {
      const reportData: Omit<IncidentReport, '_id'> = {
        ...newReport,
        timestamp: new Date().toISOString(),
        deviceId: ditto.presence.graph.localPeer.deviceName,
        status: 'pending',
      };

      await collection.upsert({
        _id: `report-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...reportData,
      });

      incidentLogger.report('added');
      setNewReport({ title: '', description: '', priority: 'medium' });
    } catch (err) {
      console.error('❌ Failed to add report:', err);
    }
  };

  if (error) {
    return <Text className="text-red-500">Error: {error}</Text>;
  }

  if (isLoading) {
    return <Text>Loading reports...</Text>;
  }

  return (
    <VStack space="md" className="p-4">
      <Text className="text-xl font-bold">Incident Reports ({reports.length})</Text>
      
      {/* Add new report form */}
      <VStack space="sm" className="p-3 bg-gray-50 rounded">
        <Input variant="outline">
          <InputField 
            placeholder="Report title"
            value={newReport.title}
            onChangeText={(text) => setNewReport(prev => ({ ...prev, title: text }))}
          />
        </Input>
        <Input variant="outline">
          <InputField 
            placeholder="Description"
            value={newReport.description}
            onChangeText={(text) => setNewReport(prev => ({ ...prev, description: text }))}
            multiline
            numberOfLines={3}
          />
        </Input>
        <Button onPress={addReport} disabled={!newReport.title.trim()}>
          <ButtonText>Add Report</ButtonText>
        </Button>
      </VStack>

      {/* Reports list */}
      {reports.map((report) => (
        <VStack key={report._id} className="p-3 border rounded bg-white">
          <HStack className="justify-between items-start">
            <Text className="font-semibold flex-1">{report.title}</Text>
            <Badge variant={
              report.priority === 'critical' ? 'destructive' :
              report.priority === 'high' ? 'warning' : 'outline'
            }>
              {report.priority}
            </Badge>
          </HStack>
          {report.description && (
            <Text className="text-sm text-gray-600 mt-1">{report.description}</Text>
          )}
          <Text className="text-xs text-gray-500 mt-2">
            {new Date(report.timestamp).toLocaleString()} • {report.deviceId}
          </Text>
        </VStack>
      ))}
      
      {reports.length === 0 && (
        <Text className="text-center text-gray-500 py-8">
          No reports yet. Add the first report above.
        </Text>
      )}
    </VStack>
  );
}