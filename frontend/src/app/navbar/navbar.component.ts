import { Component } from '@angular/core';
import { SignUpComponent } from "../sign-up/sign-up.component";
import { LoginComponent } from "../login/login.component"
import { MatDialog } from "@angular/material/dialog";
import {Router, RouterLink} from "@angular/router";
import {FirebaseAuthService} from "../services/firebase-auth.service";
import {ApiService} from "../services/ApiService";
import {User} from "../model/user";

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
  user: User | null = null;
  loggedNavbarView: boolean = false
  constructor(private dialogRef: MatDialog,
              private router: Router,
              private authService: FirebaseAuthService,
              private apiService: ApiService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.loggedNavbarView = !!user;
      this.getUserData();
    });


  }

  async getUserData(): Promise<void> {
    try {
      this.user = await this.apiService.getUserData();
    } catch (error) {
      console.error('Error al obtener datos de usuario:', error);
    }
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

  onLogout() {
    this.authService.logout();
    console.log(this.router.url)
    if(this.router.url != 'home') {
      this.router.navigate(['/home'])
      this.showDropdown=false;
    }
  }
}
