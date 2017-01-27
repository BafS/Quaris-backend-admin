import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
// import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient  } from './http-client';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  authenticate(applicationName: string, password: string): Observable<any> {
    const obs = this.http.post('/auth', { applicationName, password });
    obs.subscribe(res => {
      console.info('Set token', res.headers.get('Authorization'));

      this.http.setToken(res.headers.get('Authorization').replace(/Bearer */i, ''));
    });

    return obs;
  }
}
