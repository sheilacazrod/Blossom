import { Component } from '@angular/core';
import { SignUpComponent } from "../sign-up/sign-up.component";
import { LoginComponent } from "../login/login.component"
import { MatDialog } from "@angular/material/dialog";
import {Router, RouterLink} from "@angular/router";
import {FirebaseAuthService} from "../services/firebase-auth.service";

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
  loggedNavbarView: boolean = false
  constructor(private dialogRef: MatDialog,
              private router: Router,
              private authService: FirebaseAuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.loggedNavbarView = !!user;
    });
  }


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
