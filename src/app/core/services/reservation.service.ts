import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private api: ApiService) {}

  getMine(): Observable<Reservation[]> {
    return this.api.get<Reservation[]>(
      'reservations/my/'
    );
  }

  getAll(): Observable<Reservation[]> {
    return this.api.get<Reservation[]>(
      'reservations/'
    );
  }

  create(
    data: Partial<Reservation>
  ): Observable<Reservation> {
    return this.api.post<Reservation>(
      'reservations/',
      data
    );
  }

  update(
    id: number,
    data: Partial<Reservation>
  ): Observable<Reservation> {
    return this.api.put<Reservation>(
      `reservations/${id}/`,
      data
    );
  }

  cancel(id: number): Observable<Reservation> {
    return this.api.put<Reservation>(
      `reservations/${id}/`,
      { status: 'cancelled' }
    );
  }
}
