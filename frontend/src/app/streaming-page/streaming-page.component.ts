import {Component, OnInit} from '@angular/core';
import {StreamerSidebarComponent} from "../streamer-sidebar/streamer-sidebar.component";
import {SideBarComponent} from "../side-bar/side-bar.component";
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import {SidenavComponent} from "../sidenav/sidenav.component";
import {ActivatedRoute} from "@angular/router";
import {User} from "../model/user";
import {ApiService} from "../services/ApiService";

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
  src: string = "http://167.71.61.5/";
  user: User | null = null;

  srcAndrew = "http://167.71.61.5/andrew"
  srcMica = "http://167.71.61.5/mica"
  srcSheila = "http://167.71.61.5/sheila"
  constructor(private route: ActivatedRoute,
              private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
          this.getUserData(params['usuario']);
        });
  }

  async getUserData(name: string): Promise<void> {
    try {
      this.user = await this.apiService.getUserByName(name);
    } catch (error) {
      console.error('Error al obtener datos de usuario:', error);
    }
  }

  changeSrc(a: number) {

    const playerIframe = document.getElementById('player') as HTMLIFrameElement;
    if (a==1){
      if (playerIframe) {
        playerIframe.src = this.srcAndrew;
      }
    }
    if (a==2){
      if (playerIframe) {
        playerIframe.src = this.srcMica;
      }
    }
    if (a==3){
      if (playerIframe) {
        playerIframe.src = this.srcSheila;
      }
    }

  }
}
