import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { LoginRequest } from '../models/login.request';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService extends GenericService {
    baseUrl = environment.apiUrl + "/user";
    private currentUserSubject: BehaviorSubject<string>;
    public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(http: HttpClient){
        super(http);
        this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('currentUser') || '');
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    public loginUser(loginRequest: LoginRequest): Observable<any>{
        return this.post(loginRequest, '/login').pipe(map(response => {
            this.setUserCache(response.responseObject);
            return response;
        }));
    }

    public logout(){
        localStorage.removeItem('currentUser');
        this.loggedIn.next(false);
        this.currentUserSubject.next(JSON.parse('{}'));
    }

    // public registerUser(passwordTokenRequest: LoginRequest): Observable<any>{
    //     return this.post(passwordTokenRequest, '/register');
    // }

    private setUserCache(user: string){
        localStorage.setItem('currentUser', user);
        this.loggedIn.next(true);
        this.currentUserSubject.next(user);
    }
}