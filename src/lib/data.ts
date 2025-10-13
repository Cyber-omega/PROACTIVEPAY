import type { User, Contact, Transaction, Biller } from './types';
import { Phone, Wifi, Droplets, Receipt } from 'lucide-react';
import { PlaceHolderImages } from './placeholder-images';

const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar-1');
const contactAvatar1 = PlaceHolderImages.find(img => img.id === 'contact-avatar-1');
const contactAvatar2 = PlaceHolderImages.find(img => img.id === 'contact-avatar-2');
const contactAvatar3 = PlaceHolderImages.find(img => img.id === 'contact-avatar-3');
const contactAvatar4 = PlaceHolderImages.find(img => img.id === 'contact-avatar-4');

export const mockUser: User = {
  id: 'user-1',
  name: 'Sarah',
  email: 'sarah@example.com',
  balance: 1250.75,
  avatarUrl: userAvatar?.imageUrl || 'https://picsum.photos/seed/101/100/100',
  avatarHint: userAvatar?.imageHint || 'woman portrait',
};

export const mockContacts: Contact[] = [
  { id: 'contact-1', name: 'Michael', avatarUrl: contactAvatar1?.imageUrl || '', avatarHint: contactAvatar1?.imageHint || 'man portrait' },
  { id: 'contact-2', name: 'Emily', avatarUrl: contactAvatar2?.imageUrl || '', avatarHint: contactAvatar2?.imageHint || 'person portrait' },
  { id: 'contact-3', name: 'David', avatarUrl: contactAvatar3?.imageUrl || '', avatarHint: contactAvatar3?.imageHint || 'man smiling' },
  { id: 'contact-4', name: 'Jessica', avatarUrl: contactAvatar4?.imageUrl || '', avatarHint: contactAvatar4?.imageHint || 'woman smiling' },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    type: 'p2p-sent',
    amount: 25.00,
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Lunch yesterday',
    party: {
      name: 'Michael',
      avatarUrl: contactAvatar1?.imageUrl,
      avatarHint: contactAvatar1?.imageHint,
    },
  },
  {
    id: 'txn-2',
    type: 'bill-payment',
    amount: 75.50,
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Internet Bill',
    party: { name: 'ConnectNet ISP' },
  },
  {
    id: 'txn-3',
    type: 'p2p-received',
    amount: 50.00,
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'For concert tickets',
    party: {
      name: 'Emily',
      avatarUrl: contactAvatar2?.imageUrl,
      avatarHint: contactAvatar2?.imageHint,
    },
  },
  {
    id: 'txn-4',
    type: 'deposit',
    amount: 1500.00,
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Paycheck',
    party: { name: 'Work Inc.' },
  },
  {
    id: 'txn-5',
    type: 'bill-payment',
    amount: 45.23,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Water Bill',
    party: { name: 'AquaPure Water' },
  },
    {
    id: 'txn-6',
    type: 'p2p-sent',
    amount: 120.00,
    date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Weekend trip contribution',
    party: {
      name: 'David',
      avatarUrl: contactAvatar3?.imageUrl,
      avatarHint: contactAvatar3?.imageHint,
    },
  },
  {
    id: 'txn-7',
    type: 'p2p-received',
    amount: 15.00,
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Coffee',
    party: {
      name: 'Jessica',
      avatarUrl: contactAvatar4?.imageUrl,
      avatarHint: contactAvatar4?.imageHint,
    },
  },
  {
    id: 'txn-8',
    type: 'bill-payment',
    amount: 102.11,
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Mobile Plan',
    party: { name: 'Horizon Mobile' },
  },
];

export const mockBillers: Biller[] = [
    { id: 'biller-1', name: 'Horizon Mobile', category: 'Utilities', icon: Phone },
    { id: 'biller-2', name: 'ConnectNet ISP', category: 'Utilities', icon: Wifi },
    { id: 'biller-3', name: 'AquaPure Water', category: 'Utilities', icon: Droplets },
    { id: 'biller-4', name: 'City Power', category: 'Utilities', icon: Receipt },
    { id: 'biller-5', name: 'State Gas Co.', category: 'Utilities', icon: Receipt },
];
