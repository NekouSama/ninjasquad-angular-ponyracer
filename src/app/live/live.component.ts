import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap, filter, switchMap } from 'rxjs/operators';

import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {

  raceModel: RaceModel;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  positionSubscription: Subscription;

  error: boolean;
  winners: Array<PonyWithPositionModel> ;
  betWon: boolean;

  constructor(private raceService: RaceService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('raceId');
    this.positionSubscription = this.raceService.get(id).pipe(
      tap(
        (x: RaceModel) => this.raceModel = x
      ),
      filter(
        val => val.status !== 'FINISHED'
      ),
      switchMap(
        () => this.raceService.live(id)
      )
    )
    .subscribe(
      next => {
        this.poniesWithPosition = next;
        this.raceModel.status = 'RUNNING';
      },
      error => this.error = true,
      () => {
        this.raceModel.status = 'FINISHED';
        this.winners = this.poniesWithPosition.filter(array => array.position > 99);
        this.betWon = this.winners.some(array => array.id === this.raceModel.betPonyId);
      }
    );
  }

  ngOnDestroy() {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

}
