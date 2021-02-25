import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login.request';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstName = new FormControl('', [
    Validators.required,
  ]);
  lastName = new FormControl('', [
    Validators.required,
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password = new FormControl('', [
    Validators.required,
  ]);

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  user: User = new User();

  save(){
    this.user = new User();
    this.user.firstName = this.firstName.value;
    this.user.lastName = this.lastName.value;
    this.user.email = this.email.value;
    this.user.password = this.password.value;
    this.authService.post(this.user, '').subscribe(result => {
      let loginRequest = new LoginRequest();
      loginRequest.email = this.user.email;
      loginRequest.password = this.user.password;
      this.authService.loginUser(loginRequest).subscribe(result => {
        this.router.navigate(['']);
      }, error => {
        alert(error.statusText + ': ' + error.error);
      });
    }, error => {
      alert(error.statusText + ': ' + error.error);
    });
  }

  loginPage(){
    this.router.navigate(['login']);
  }

}
