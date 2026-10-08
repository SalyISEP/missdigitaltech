import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(
      `${this.baseUrl}/${endpoint}`,
      this.options()
    );
  }

  post<T>(endpoint: string, data: unknown): Observable<T> {
    return this.http.post<T>(
      `${this.baseUrl}/${endpoint}`,
      data,
      this.options()
    );
  }

  put<T>(endpoint: string, data: unknown): Observable<T> {
    return this.http.put<T>(
      `${this.baseUrl}/${endpoint}`,
      data,
      this.options()
    );
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(
      `${this.baseUrl}/${endpoint}`,
      this.options()
    );
  }

  private options() {
    const token = localStorage.getItem('mdt_access_token');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set(
        'Authorization',
        `Bearer ${token}`
      );
    }

    return { headers };
  }
}
