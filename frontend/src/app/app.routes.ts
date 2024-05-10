import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {StreamingPageComponent} from "./streaming-page/streaming-page.component";
import {FollowingComponent} from "./following/following.component";
import {HomeComponent} from "./home/home.component";
import {CategoriesComponent} from "./categories/categories.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'following', component: FollowingComponent},
  { path: 'home', component: HomeComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'streaming', component: StreamingPageComponent },
  { path: 'user/:usuario', component: StreamingPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
