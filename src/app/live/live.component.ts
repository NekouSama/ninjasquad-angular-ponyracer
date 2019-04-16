import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {
  race: any;

  constructor(private raceService: RaceService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const raceId = +this.route.snapshot.paramMap.get('raceId');
    this.raceService.get(raceId).subscribe(
      race => this.race = race
    )
  }

}
