import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  navbarCollapsed = true;
  user: UserModel;
  userEventsSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userEventsSubscription = this.userService.userEvents.subscribe(
      user => this.user = user
    );
  }

  toggleNavbar() {
    this.navbarCollapsed
    ? this.navbarCollapsed = false
    : this.navbarCollapsed = true;
  }

  ngOnDestroy(): void {
    this.userEventsSubscription.unsubscribe();
  }

}
