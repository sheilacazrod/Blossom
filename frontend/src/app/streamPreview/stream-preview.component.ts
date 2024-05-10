import { Component, Input } from '@angular/core';
import { User } from '../model/user';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-streamPreview',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './stream-preview.component.html',
  styleUrl: './stream-preview.component.css'
})
export class StreamPreviewComponent {
  @Input() user!: User;
}
