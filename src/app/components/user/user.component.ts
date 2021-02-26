import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private authService: AuthService
    , private router: Router
    , private dialog: MatDialog) {}

  users: User[] = [];

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.users = [];
    this.authService.userList().subscribe(result => {
      this.users = result.responseObject
    }, error => {
      alert(error.statusText + ': ' + error.error);
    });
  }

  editPage(id: number){
    this.router.navigate(['/user/edit'], { queryParams: { userId: id }});
  }

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

  save(){
    this.authService.put(this.user, '').subscribe(result => {
      this.user = result.responseObject;
      this.load();
      this.editMode = false;
    }, error => {
      alert(error.statusText + ': ' + error.error);
    });
  }

  user: User = new User();
  editMode: boolean = false;

  edit(id: number){
    this.editMode = true;
    this.user = this.users.find(x => x.id == id) || new User();
  }

  cancel(){
    this.editMode = false;
    this.user = new User();
  }

  delete(id: number){
    this.authService.deleteUser(id).subscribe(result => {
      this.users = this.users.filter(x => x.id != id);
    }, error => {
      alert(error.statusText + ': ' + error.error);
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}