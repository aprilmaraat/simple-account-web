import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends GenericService{
  baseUrl = environment.apiUrl + "/user";

  constructor(http: HttpClient){
    super(http);  
  }

  userList(): Observable<any>{
    return this.http.get<any>(this.baseUrl + '/user-list', { headers: this.headers });
  }
}
