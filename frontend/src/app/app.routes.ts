import { Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {StreamingPageComponent} from "./streaming-page/streaming-page.component";
import {FollowingComponent} from "./following/following.component";
import {HomeComponent} from "./home/home.component";
import {CategoriesComponent} from "./categories/categories.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'streaming', component: StreamingPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'following', component: FollowingComponent},
  { path: 'home', component: HomeComponent},
  { path: 'categories', component: CategoriesComponent},
];
