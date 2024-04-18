import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-button',
  templateUrl: './register-button.component.html',
  standalone: true,
  styleUrls: ['./register-button.component.css']
})
export class RegisterButtonComponent {
  @Output() onRegister = new EventEmitter<void>();

  register() {
    this.onRegister.emit();
  }
}
