import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private api: ApiService) {}

  getMine(): Observable<Message[]> {
    return this.api.get<Message[]>(
      'messages/my/'
    );
  }

  getAll(): Observable<Message[]> {
    return this.api.get<Message[]>(
      'messages/'
    );
  }

  markAsRead(id: number): Observable<Message> {
    return this.api.put<Message>(
      `messages/${id}/`,
      { read: true }
    );
  }
}
