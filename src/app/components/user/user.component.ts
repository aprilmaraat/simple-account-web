import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';

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
    this.authService.userList().subscribe(result => {
      this.users = result.responseObject
    }, error => {
      alert(error.statusText + ': ' + error.error);
    });
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