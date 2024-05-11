import {Component, inject, Input} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StreamingPageComponent} from "./streaming-page/streaming-page.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { MatDialogModule } from "@angular/material/dialog";
import {HomeComponent} from "./home/home.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {SideBarComponent} from "./side-bar/side-bar.component";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {FirebaseAuthService} from "./services/firebase-auth.service";
import {User} from "./model/user";
import {ApiService} from "./services/ApiService";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet,
        StreamingPageComponent,
        NavbarComponent,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        MatDialogModule,
        VgBufferingModule,
        HomeComponent,
        CommonModule,
        FormsModule, SideBarComponent, SidenavComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Blossom';
  follows: User[] = [];

  extend= false;

  authService = inject(FirebaseAuthService)

  constructor(private  apiService: ApiService) {}
  ngOnInit(): void{
    this.authService.user$.subscribe((user) =>{
      if(user){
        // @ts-ignore
        this.authService.currentUserSig.set({
          email: user.email!,
          displayName: user.displayName!,
        });
        this.getFollowers();
      } else {
        this.authService.currentUserSig.set(null)
      }
      console.log(this.authService.currentUserSig());
    });
  }

  toogleSidebar(data: boolean){
    this.extend=data;
  }

  getFollowers(){
    this.apiService.getFollowers()
      .then((booksObservable: Observable<User[]>) => {
        booksObservable.subscribe((users: User[]) => {
          this.follows = users;
          console.log(this.follows)
        });
      })
      .catch((error) => {
        console.error("Error al obtener los seguidores:", error);
      });
  }

}
