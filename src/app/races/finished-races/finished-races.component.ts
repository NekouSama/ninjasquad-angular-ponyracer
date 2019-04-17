import { Component, OnInit } from '@angular/core';
import { RaceModel } from 'src/app/models/race.model';
import { RaceService } from 'src/app/race.service';

@Component({
  selector: 'pr-finished-races',
  templateUrl: './finished-races.component.html',
  styleUrls: ['./finished-races.component.css']
})
export class FinishedRacesComponent implements OnInit {

  races: Array<RaceModel> = [];

  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.raceService.list('FINISHED').subscribe(
      (response: Array<RaceModel>) => this.races = response
    );
  }
}
