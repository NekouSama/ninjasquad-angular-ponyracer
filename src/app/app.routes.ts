import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
//import { RacesComponent } from './races/races.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BetComponent } from './bet/bet.component';
import { LiveComponent } from './live/live.component';
import { LoggedInGuard } from './logged-in.guard';
import { FinishedRacesComponent } from './races/finished-races/finished-races.component';
import { PendingRacesComponent } from './races/pending-races/pending-races.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'races',
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/races/pending' },
      { path: 'pending', component: PendingRacesComponent },
      { path: 'finished', component: FinishedRacesComponent },
      { path: ':raceId', component: BetComponent },
      { path: ':raceId/live', component: LiveComponent }
    ],
    canActivate: [LoggedInGuard]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];
