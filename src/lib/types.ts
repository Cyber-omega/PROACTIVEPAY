export type Transaction = {
  id: string;
  type: 'p2p-sent' | 'p2p-received' | 'bill-payment' | 'deposit';
  amount: number;
  date: string;
  description: string;
  party: {
    name: string;
    avatarUrl?: string;
    avatarHint?: string;
  };
};

export type User = {
  id: string;
  name: string;
  email: string;
  balance: number;
  avatarUrl: string;
  avatarHint: string;
};

export type Contact = {
  id: string;
  name: string;
  avatarUrl: string;
  avatarHint: string;
};

export type Biller = {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
};
