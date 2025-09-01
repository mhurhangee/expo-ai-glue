import { IncidentDashboard } from '@/components/incident-dashboard';
import { OptionalSyncComponent } from '@/components/optional-sync';
import { VStack } from '@/components/ui/vstack';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

export default function DashboardScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <VStack space="lg" className="p-4">
          <IncidentDashboard />
          <OptionalSyncComponent />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}