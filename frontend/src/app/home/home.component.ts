import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private sanitizer: DomSanitizer) {}
  videos = [
    'https://www.youtube.com/embed/BwD6WTEhftQ',
    'https://www.youtube.com/embed/oKVYm8mIUdo',
    'https://www.youtube.com/embed/av4sEcTS8QA'
  ];

  currentIndex = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.videos.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.videos.length) % this.videos.length;
  }

  getVideoUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.videos[this.currentIndex]);
  }
}
