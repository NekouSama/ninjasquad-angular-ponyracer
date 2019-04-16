import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent implements OnInit {

  @Input() ponyModel: PonyModel;
  @Input() isRunning: boolean;
  @Output() readonly ponyClicked: EventEmitter<any> = new EventEmitter<PonyModel>();

  constructor() { }

  ngOnInit() {
  }

  getPonyImageUrl(): string {
    const color = this.ponyModel.color.toLowerCase();
    const prefix = 'assets/images/pony-'; 
    const postfix = '.gif';   
    if (this.isRunning) {
      return prefix + color + '-running' + postfix;
    } else {
      return prefix + color + postfix;
    }    
  }

  clicked() {
    this.ponyClicked.emit(this.ponyModel);
  }

}
