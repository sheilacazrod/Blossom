import {Component, OnInit} from '@angular/core';
import DPlayer from "dplayer";
// @ts-ignore
import Hls from './hls.js';

@Component({
  selector: 'app-dplayer',
  standalone: true,
  imports: [],
  templateUrl: './dplayer.component.html',
  styleUrl: './dplayer.component.css'
})
export class DPlayerComponent implements OnInit{
  player: any
  ngOnInit(): void {

    if (Hls.isSupported()) {
      const video = document.getElementById('dplayer') as HTMLVideoElement;
      const hls = new Hls();
      hls.loadSource('hls/stream.m3u8');
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play(); // Reproduce el video una vez que el manifiesto se ha cargado
      });
    }

    this.player = new DPlayer({
      container: document.getElementById('dplayer'),
      screenshot: true,
      video: {
        url: 'hls/stream.m3u8',
        type: 'hls',
        defaultQuality: 0,
        pic: 'demo.jpg',
        thumbnails: 'thumbnails.jpg',
      }
    });
  }
}
