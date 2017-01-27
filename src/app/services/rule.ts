import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient  } from './http-client';

@Injectable()
export class RuleService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get('/rules');
  }
}
