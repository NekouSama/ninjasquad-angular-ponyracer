import { Component, OnInit } from '@angular/core';
import { RaceModel } from 'src/app/models/race.model';
import { RaceService } from 'src/app/race.service';

@Component({
  selector: 'pr-pending-races',
  templateUrl: './pending-races.component.html',
  styleUrls: ['./pending-races.component.css']
})
export class PendingRacesComponent implements OnInit {

  races: Array<RaceModel> = [];

  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.raceService.list('PENDING').subscribe(
      (response: Array<RaceModel>) => this.races = response
    );
  }
}
