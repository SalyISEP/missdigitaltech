import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private api: ApiService) {}

  getMine(): Observable<Payment[]> {
    return this.api.get<Payment[]>(
      'payments/my/'
    );
  }

  getAll(): Observable<Payment[]> {
    return this.api.get<Payment[]>(
      'payments/'
    );
  }

  create(
    data: Partial<Payment>
  ): Observable<Payment> {
    return this.api.post<Payment>(
      'payments/',
      data
    );
  }

  getById(id: number): Observable<Payment> {
    return this.api.get<Payment>(
      `payments/${id}/`
    );
  }
}
