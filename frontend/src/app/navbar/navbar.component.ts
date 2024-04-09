import { Component } from '@angular/core';
import { SignUpComponent } from "../sign-up/sign-up.component";
import { LoginComponent } from "../login/login.component"
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SignUpComponent,
    LoginComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  constructor(private dialogRef: MatDialog) {
  }

  openDialog(i: number){
    if(i==0){
      this.dialogRef.open(LoginComponent);
    }
    else{
      this.dialogRef.open(SignUpComponent)
    }
  }
}
