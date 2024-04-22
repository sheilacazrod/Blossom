import { Component } from '@angular/core';
import { SignUpComponent } from "../sign-up/sign-up.component";
import { LoginComponent } from "../login/login.component"
import { MatDialog } from "@angular/material/dialog";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SignUpComponent,
    LoginComponent,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  constructor(private dialogRef: MatDialog, private router: Router) {}

  openDialog(i: number){
    if(i==0){
      this.dialogRef.open(LoginComponent);
    }
    else{
      this.dialogRef.open(SignUpComponent)
    }
  }

  showDropdown= false;

  toggleDropdown(){
    this.showDropdown=!this.showDropdown;
  }
}
