import { Component, Input } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-streamPreview',
  standalone: true,
  imports: [],
  templateUrl: './stream-preview.component.html',
  styleUrl: './stream-preview.component.css'
})
export class StreamPreviewComponent {
  @Input() user!: User;
}
