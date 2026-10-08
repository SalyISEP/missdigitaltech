import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { Formation } from '../models/formation.model';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private readonly localKey = 'mdt_formations';

  constructor(private api: ApiService) {}

  getAll(): Observable<Formation[]> {
    return this.api.get<Formation[]>('formations/');
  }

  getById(id: number): Observable<Formation> {
    return this.api.get<Formation>(`formations/${id}/`);
  }

  create(data: Partial<Formation>): Observable<Formation> {
    return this.api.post<Formation>('formations/', data);
  }

  update(
    id: number,
    data: Partial<Formation>
  ): Observable<Formation> {
    return this.api.put<Formation>(
      `formations/${id}/`,
      data
    );
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(
      `formations/${id}/`
    );
  }
}
