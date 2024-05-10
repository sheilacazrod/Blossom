import {Component} from '@angular/core';
import {StreamerSidebarComponent} from "../streamer-sidebar/streamer-sidebar.component";
import {SideBarComponent} from "../side-bar/side-bar.component";
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import {SidenavComponent} from "../sidenav/sidenav.component";
import {ActivatedRoute} from "@angular/router";
import {User} from "../model/user";
import {ApiService} from "../services/ApiService";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
          this.getUserData(params['usuario']);
        });
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
    } catch (error) {
      console.error('Error al obtener datos de usuario:', error);
    }
  }

  async follow(){
    if(this.user){
      try {
        const resultado = await this.apiService.addFollow(this.user.userId);
        console.log('Resultado de addFollow:', resultado);
      } catch (error) {
        console.error('Error al llamar a addFollow:', error);
      }
    }
  }
}
