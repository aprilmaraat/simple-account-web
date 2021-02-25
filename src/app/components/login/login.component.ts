import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login.request';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginRequest: LoginRequest = new LoginRequest();

  login(){
    this.loginRequest = new LoginRequest();
    if(!this.emailFormControl.hasError('email') && !this.emailFormControl.hasError('required') && !this.passwordFormControl.hasError('required')){
      this.loginRequest.email = this.emailFormControl.value;
      this.loginRequest.password = this.passwordFormControl.value;
      this.authService.loginUser(this.loginRequest).subscribe(result => {
        this.router.navigate(['']);
      }, error => {
        alert(error.statusText + ': ' + error.error);
      });
    }
  }

}
