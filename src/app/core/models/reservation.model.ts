export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed';

export interface Reservation {
  id: number;
  formationId?: number;
  formationTitle?: string;
  date: string;
  time?: string;
  status: ReservationStatus;
  notes?: string;
}
