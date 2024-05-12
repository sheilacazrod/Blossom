import {Component, inject} from '@angular/core';
import {StreamerSidebarComponent} from "../streamer-sidebar/streamer-sidebar.component";
import {SideBarComponent} from "../side-bar/side-bar.component";
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import {SidenavComponent} from "../sidenav/sidenav.component";
import {ActivatedRoute} from "@angular/router";
import {User} from "../model/user";
import {ApiService} from "../services/ApiService";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {Observable} from "rxjs";
import {FirebaseAuthService} from "../services/firebase-auth.service";
import {Stream} from "../model/stream";

@Component({
  selector: 'app-streaming-page',
  standalone: true,
  imports: [
    StreamerSidebarComponent,
    SideBarComponent,
    VgCoreModule,
    SidenavComponent
  ],
  templateUrl: './streaming-page.component.html',
  styleUrl: './streaming-page.component.css'
})
export class StreamingPageComponent{
  src!: SafeResourceUrl;
  user: User | null = null;
  isfollowing: boolean = false;
  follows: User[] = [];
  stream: Stream | null = null;

  authService = inject(FirebaseAuthService)

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
          this.getUserData(params['usuario']);
        });
    this.authService.user$.subscribe((user) =>{
      this.getFollowers();
    });
  }


  async getStreamData(id: string):Promise<void>{
      try {
        this.stream = await this.apiService.getStreamDatabyid(id);
        console.log(this.stream)
      } catch (error) {
        console.error("Error al obtener los datos del stream:", error);
      }
  }
  getVideoUrl(){
    if(this.user){
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.user.streamUrl.replace(/rtmp/g, 'http'));
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl("");
  }



  async getUserData(name: string): Promise<void> {
    try {
      this.user = await this.apiService.getUserByName(name);
      if(this.user){
        this.getStreamData(this.user.userId);
      }
    } catch (error) {
      console.error('Error al obtener datos de usuario:', error);
    }
  }

  async follow(){
    if(this.user){
      try {
        const resultado = await this.apiService.addFollow(this.user.userId);
        window.location.reload();
      } catch (error) {
        console.error('Error al llamar a addFollow:', error);
      }
    }
  }

  async unfollow(){
    if(this.user){
      try {
        const resultado = await this.apiService.deleteFollow(this.user.userId);
        window.location.reload();
      } catch (error) {
        console.error('Error al llamar a addFollow:', error);
      }
    }
  }


  getFollowers(){
    this.apiService.getFollowers()
      .then((booksObservable: Observable<User[]>) => {
        booksObservable.subscribe((users: User[]) => {
          this.follows = users;
          if(this.user){
            this.isfollowing= this.isUserFollowed(this.user?.userId)
          }
        });
      })
      .catch((error) => {
        console.error("Error al obtener los seguidores:", error);
      });
  }

  isUserFollowed(userIdToCheck: string): boolean {
    for (const user of this.follows) {
      if (user.userId === userIdToCheck) {
        return true;
      }
    }
    return false;
  }
}
