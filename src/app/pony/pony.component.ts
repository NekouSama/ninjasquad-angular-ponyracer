import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent implements OnInit {

  @Input() ponyModel: PonyModel;
  @Output() readonly ponyClicked = new EventEmitter<PonyModel>();

  constructor() { }

  ngOnInit() {
  }

  getPonyImageUrl(): string {
    const color = this.ponyModel.color.toLowerCase();
    const prefix = 'assets/images/pony-';
    const postfix = '.gif';
    return prefix + color + postfix;
  }

  clicked() {
    this.ponyClicked.emit(this.ponyModel);
  }

}
