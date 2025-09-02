import { IncidentReports } from '@/components/incident-reports';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

export default function ReportsScreen() {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <IncidentReports />
      </ScrollView>
    </SafeAreaView>
  );
}