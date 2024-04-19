import { Component } from '@angular/core';
import { SignUpComponent } from "../sign-up/sign-up.component";
import { LoginComponent } from "../login/login.component"
import { MatDialog } from "@angular/material/dialog";
import {Router} from "@angular/router";

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
  constructor(private dialogRef: MatDialog, private router: Router) {}

  openDialog(i: number){
    if(i==0){
      this.dialogRef.open(LoginComponent);
    }
    else{
      this.dialogRef.open(SignUpComponent)
    }
  }

  navigateToProfile(){
    this.router.navigate(['/profile']);
  }
  navigateToStreaming(){
    this.router.navigate(['/streaming']);
  }

  navigateToFollowing(){
    this.router.navigate(['/following']);
  }

  navigateToHome(){
    this.router.navigate(['/home']);
  }


  showDropdown= false;

  toggleDropdown(){
    this.showDropdown=!this.showDropdown;
  }
}
