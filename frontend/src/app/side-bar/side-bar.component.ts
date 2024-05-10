import {Component, EventEmitter, Output} from '@angular/core';
import {StreamerSidebarComponent} from "../streamer-sidebar/streamer-sidebar.component";
import {User} from "../model/user";
import {Observable} from "rxjs";
import {ApiService} from "../services/ApiService";
import {StreamPreviewComponent} from "../streamPreview/stream-preview.component";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    StreamerSidebarComponent,
    StreamPreviewComponent
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  @Output() extended =new EventEmitter<boolean>();
  follows: User[] = [];

  constructor(private  apiService: ApiService) {}

  ngOnInit(): void {
    this.getFollowers();
  }

  Toggle() {
    this.extended.emit(false);
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
