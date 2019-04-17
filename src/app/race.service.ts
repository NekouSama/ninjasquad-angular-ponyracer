import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { RaceModel, LiveRaceModel } from './models/race.model';
import { PonyWithPositionModel } from './models/pony.model';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient,
              private wsService: WsService) {}

  list(): Observable<Array<RaceModel>> {
    const params = { status: 'PENDING' };
    return this.http.get<Array<RaceModel>>(`${environment.baseUrl}/api/races`, { params });
  }

  get(raceId: number): Observable<RaceModel> {
    return this.http.get<RaceModel>(`${environment.baseUrl}/api/races/${raceId}`);
  }

  bet(raceId: number, ponyId: number): Observable<RaceModel> {
    return this.http.post<RaceModel>(`${environment.baseUrl}/api/races/${raceId}/bets`, { ponyId });
  }

  cancelBet(raceId: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/api/races/${raceId}/bets`);
  }

  live(raceId: number): Observable<any> {
    return this.wsService.connect(`/race/${raceId}`).pipe(
      map((position): LiveRaceModel => {
        return position.ponies;
      })
    );
/*
    return interval(1000).pipe(
      take(101),
      map(position => {
        return [{
          id: 1,
          name: 'Superb Runner',
          color: 'BLUE',
          position
        }, {
          id: 2,
          name: 'Awesome Fridge',
          color: 'GREEN',
          position
        }, {
          id: 3,
          name: 'Great Bottle',
          color: 'ORANGE',
          position
        }, {
          id: 4,
          name: 'Little Flower',
          color: 'YELLOW',
          position
        }, {
          id: 5,
          name: 'Nice Rock',
          color: 'PURPLE',
          position
        }];
      })
    );
*/
  }

}
