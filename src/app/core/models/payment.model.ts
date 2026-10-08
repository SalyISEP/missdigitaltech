export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'cancelled';

export interface Payment {
  id: number;
  amount: number;
  method: string;
  reference?: string;
  status: PaymentStatus;
  createdAt: string;
}
