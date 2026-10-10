import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Payment {
  id: number;
  amount: string;
  method: string;
  reference: string;
  status: string;
  created_at: string;
  user: number;
}

export interface PaymentData {
  reservation: number;
  method: 'wave' | 'orange_money';
  reference?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly api = `${environment.apiUrl}/payments/`;

  constructor(private http: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.api);
  }

  createPayment(data: PaymentData): Observable<Payment> {
    return this.http.post<Payment>(this.api, data);
  }
}
