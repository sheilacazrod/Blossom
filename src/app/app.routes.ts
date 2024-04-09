import { Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {StreamingPageComponent} from "./streaming-page/streaming-page.component";

export const routes: Routes = [
  { path: '', redirectTo: '/streaming', pathMatch: 'full' },
  { path: 'streaming', component: StreamingPageComponent },
  { path: 'profile', component: ProfileComponent }
];
