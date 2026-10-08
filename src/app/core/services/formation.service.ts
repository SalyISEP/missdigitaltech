import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Formation {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
  duration: string;
  image: string;
  available: boolean;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private readonly api = `${environment.apiUrl}/formations/`;

  constructor(private http: HttpClient) {}

  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.api);
  }

  getFormation(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.api}${id}/`);
  }
}
