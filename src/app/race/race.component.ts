import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'pr-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {

  @Input() raceModel: any;

  constructor() { }

  ngOnInit() {
  }

}
