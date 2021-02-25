import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { LoginRequest } from '../models/login.request';
import { map } from 'rxjs/operators';
import { AuthResponse } from '../models/auth.response';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService extends GenericService {
    baseUrl = environment.apiUrl + "/token";
    private currentUserSubject: BehaviorSubject<AuthResponse>;
    public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(public http: HttpClient){
        super(http);
        this.currentUserSubject = new BehaviorSubject<AuthResponse>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    public loginUser(passwordTokenRequest: LoginRequest): Observable<any>{
        return this.post(passwordTokenRequest, '/login').pipe(map(response => {
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

    private setUserCache(user: AuthResponse){
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.loggedIn.next(true);
        this.currentUserSubject.next(user);
    }
}