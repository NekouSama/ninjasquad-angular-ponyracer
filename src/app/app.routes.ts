import { RacesComponent } from './races/races.component';
import { HomeComponent } from './home/home.component';

export const ROUTES = [
    { path: 'races', component: RacesComponent },
    { path: '', component: HomeComponent },
    { path: '**', component: HomeComponent }
];
