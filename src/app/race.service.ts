import { Injectable } from '@angular/core';

import { RaceModel } from './models/race.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Array<RaceModel>>(`${environment.baseUrl}/api/races?status=PENDING`);
  }

  bet(raceId: number, ponyId: number) {
    const body = { ponyId };
    return this.http.post(`${environment.baseUrl}/api/races/${raceId}/bets`, body);
  }

  get(id: number) {
    return this.http.get(`${environment.baseUrl}/api/races/${id}`);
  }

  cancelBet(raceId: number) {
    return this.http.delete(`${environment.baseUrl}/api/races/${raceId}/bets`);
  }

  live(raceId: number): Observable<number> {
    const positions = interval(200);
    return positions.pipe(map())
  }
}
