import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient  } from './http-client';
import { Rule } from '../models/rule';

@Injectable()
export class RuleService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get('/rules');
  }

  update(ruleId, rule: Rule): Observable<any> {
    return this.http.put('/rules/' + ruleId, rule);
  }

  delete(ruleId): Observable<any> {
    return this.http.delete('/rules/' + ruleId);
  }
}
