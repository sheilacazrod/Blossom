import { Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {StreamingPageComponent} from "./streaming-page/streaming-page.component";
import {FollowingComponent} from "./following/following.component";

export const routes: Routes = [
  { path: '', redirectTo: '/streaming', pathMatch: 'full' },
  { path: 'streaming', component: StreamingPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'following', component: FollowingComponent}
];
