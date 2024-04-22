import {Component, OnInit} from '@angular/core';
import {StreamerSidebarComponent} from "../streamer-sidebar/streamer-sidebar.component";
import {SideBarComponent} from "../side-bar/side-bar.component";
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import {SidenavComponent} from "../sidenav/sidenav.component";
import {ActivatedRoute} from "@angular/router";

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
  usuario: string = "";
  src: string = "http://167.71.61.5/";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.usuario = params['usuario'];
      this.src = this.src + this.usuario;
      console.log('Usuario:', this.usuario);
    });
  }

  // changeSrc(a: number) {
  //
  //   const playerIframe = document.getElementById('player') as HTMLIFrameElement;
  //   if (a==1){
  //     if (playerIframe) {
  //       playerIframe.src = this.src1;
  //     }
  //   }
  //   if (a==2){
  //     if (playerIframe) {
  //       playerIframe.src = this.src2;
  //     }
  //   }
  //
  // }
}
