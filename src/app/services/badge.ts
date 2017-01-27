import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient  } from './http-client';
import { Badge } from '../models/badge';

@Injectable()
export class BadgeService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get('/badges');
  }

  create(badge: Badge): Observable<any> {
    return this.http.post('/badges', badge);
  }
}
