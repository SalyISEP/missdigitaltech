import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Reservation {
  id: number;
  formation: number;
  formationTitle: string;
  date: string;
  time: string | null;
  notes: string;
  status: string;
  created_at: string;
}

export interface ReservationData {
  formation: number;
  date: string;
  time?: string;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly api = `${environment.apiUrl}/reservations/`;

  constructor(private http: HttpClient) {}

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.api);
  }

  createReservation(data: ReservationData): Observable<Reservation> {
    return this.http.post<Reservation>(this.api, data);
  }
}
