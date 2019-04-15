import { Injectable } from '@angular/core';

import { RaceModel } from './models/race.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) {}

  list() {
    const baseUrl = 'http://ponyracer.ninja-squad.com';
    return this.http.get<Array<RaceModel>>(`${baseUrl}/api/races?status=PENDING`);
  }
}
