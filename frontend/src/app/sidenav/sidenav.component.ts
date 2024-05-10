import { Component } from '@angular/core';
import {StreamerSidebarComponent} from "../streamer-sidebar/streamer-sidebar.component";
import { EventEmitter, Output } from '@angular/core';
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {ApiService} from "../services/ApiService";
import {StreamerSidenavComponent} from "../streamer-sidenav/streamer-sidenav.component";



@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  imports: [
    StreamerSidebarComponent,
    RouterLink,
    StreamerSidenavComponent
  ],
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Output() extended =new EventEmitter<boolean>();

  follows: User[] = [];

  constructor(private  apiService: ApiService) {}

  ngOnInit(): void {
    this.getFollowers();
  }

  Toggle() {
    this.extended.emit(true);
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

