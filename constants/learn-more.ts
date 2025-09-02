import { ReactNode } from 'react';
import { CONTACT_DATA } from './contact';

export interface LearnMoreItem {
  id: string;
  icon: string;
  title: string;
  content: ReactNode | string | object;
  type?: 'text' | 'list' | 'code' | 'mixed';
}

export const LEARN_MORE_DATA: LearnMoreItem[] = [
  {
    id: 'about-interview',
    icon: 'briefcase',
    title: 'About this interview project',
    type: 'text',
    content: 'This demo app was built to showcase technical skills for a Ditto position. It demonstrates proficiency with React Native, modern development practices, and understanding of Ditto\'s core concepts. The incident management theme highlights how Ditto solves real-world problems in mission-critical applications.'
  },
  {
    id: 'what-is-ditto',
    icon: 'database',
    title: 'What is Ditto?',
    type: 'text',
    content: 'Ditto is the only mobile database with built-in edge device connectivity and resiliency, enabling apps to synchronize without relying on a central server or constant cloud connectivity. Through CRDTs and P2P mesh replication, Ditto allows building collaborative, resilient applications where data is always available and up-to-date for every user.'
  },
  {
    id: 'ditto-features',
    icon: 'wifi-off',
    title: 'How does Ditto power this app?',
    type: 'list',
    content: [
      'Offline-first operation - app works without internet',
      'Real-time peer-to-peer sync between devices',
      'CRDT-driven automatic conflict resolution',
      'JSON document storage with DQL queries',
      'Mesh networking via Bluetooth, WiFi, and LAN',
      'Multi-writer collaboration without data loss'
    ]
  },
  {
    id: 'why-incident-management',
    icon: 'shield',
    title: 'Why incident management for this demo?',
    type: 'text',
    content: 'Incident management is perfect for showcasing Ditto\'s capabilities. During emergencies, network connectivity is often unreliable, but teams need to coordinate in real-time. With Ditto\'s offline-first architecture and P2P mesh networking, incident responders can collaborate seamlessly even without internet access.'
  },
  {
    id: 'tech-stack',
    icon: 'code',
    title: 'What\'s the tech stack?',
    type: 'list',
    content: [
      'React Native with Expo SDK 50+',
      'Ditto Edge Sync Platform with embedded database',
      'Expo Router for file-based navigation',
      'Gluestack UI v3 component library',
      'NativeWind (Tailwind CSS for React Native)',
      'TypeScript for type safety',
      'DQL (Ditto Query Language) for data queries'
    ]
  },
  {
    id: 'offline-first',
    icon: 'wifi-off',
    title: 'How does offline-first work?',
    type: 'text',
    content: 'Ditto uses an offline-first architecture where each device maintains a local embedded database. Your app remains fully functional even when offline - users can read and write data without a network connection. Changes made offline are stored locally and automatically synced when connectivity returns.'
  },
  {
    id: 'crdt-magic',
    icon: 'git-merge',
    title: 'What are CRDTs and why do they matter?',
    type: 'text',
    content: 'Conflict-Free Replicated Data Types (CRDTs) are the secret sauce that makes Ditto work. If multiple users edit the same data while offline, CRDTs automatically merge those changes when devices sync up - without dropping or overwriting data. No complex conflict resolution code needed!'
  },
  {
    id: 'demo-features',
    icon: 'star',
    title: 'What features does the demo include?',
    type: 'list',
    content: [
      'Dark/Light mode toggle with system preference',
      'Modern component-based architecture',
      'Responsive design patterns',
      'Custom icon system with Feather icons',
      'Modular FAQ system with different content types',
      'Clean navigation with Expo Router',
      'Ditto SDK integration for data synchronization',
      'Professional UI matching Ditto\'s design language'
    ]
  },
  {
    id: 'getting-started',
    icon: 'play-circle',
    title: 'How do I run this demo?',
    type: 'mixed',
    content: {
      text: 'This demo is built with Expo for easy development, multi-platform support and testing:',
      steps: [
        'Clone the repository from GitHub',
        'Install dependencies with npm or yarn',
        'Create a development build (Ditto requires native modules)',
        'Install the dev build on your device',
        'Explore the app and test Ditto\'s offline capabilities'
       ],
      cta: 'The app demonstrates real Ditto functionality - try turning off your internet!'
    }
  },
  {
    id: 'devices',
    icon: 'smartphone',
    title: 'What devices are supported?',
    type: 'text',
    content: 'Ditto supports a wide range of devices, including iOS, and Android. The demo app is built with Expo for cross-platform support and testing. However, during development it was only tested on iOS devices.'
  },
  {
    id: 'contact',
    icon: 'mail',
    title: 'Questions about this demo?',
    type: 'mixed',
    content: {
      text: 'Feel free to reach out if you have questions about the implementation:',
      contacts: [
        { type: 'email', value: CONTACT_DATA.email, icon: 'mail' },
        { type: 'github', value: 'View Source Code', url: CONTACT_DATA.github, icon: 'github' },
        { type: 'linkedin', value: 'Connect on LinkedIn', url: CONTACT_DATA.linkedin, icon: 'linkedin' }
      ]
    }
  }
];