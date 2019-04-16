import { Injectable } from '@angular/core';

import { RaceModel } from './models/race.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Array<RaceModel>>(`${environment.baseUrl}/api/races?status=PENDING`);
  }
}
