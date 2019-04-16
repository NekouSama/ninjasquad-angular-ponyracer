import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  navbarCollapsed = true;
  user: UserModel;

  constructor(private userService: UserService) { }

  ngOnInit() {
    //this.user = this.userService.userEvents
  }

  toggleNavbar() {
    this.navbarCollapsed
    ? this.navbarCollapsed = false
    : this.navbarCollapsed = true;
  }

}
