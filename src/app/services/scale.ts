import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient  } from './http-client';
import { Scale } from '../models/scale';

@Injectable()
export class ScaleService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get('/scales');
  }

  update(scaleId, scale: Scale): Observable<any> {
    return this.http.put('/scales/' + scaleId, scale);
  }

  delete(scaleId): Observable<any> {
    return this.http.delete('/scales/' + scaleId);
  }
}
