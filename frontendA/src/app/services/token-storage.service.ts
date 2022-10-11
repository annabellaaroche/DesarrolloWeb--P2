import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_ID = 'user-id';
const USER_ROL = 'user-rol';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private jwtHelper: JwtHelperService) { }
  signOut():void{
    window.sessionStorage.clear();
  }

  public saveToken(token: string):void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user: any):void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser():any{
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user){
      return JSON.parse(user);
    }
    return [];
    }

    public saveID(user: string):void {
      window.sessionStorage.removeItem(USER_ID);
      window.sessionStorage.setItem(USER_ID, user);
    }
  
    public getID():any{
      return window.sessionStorage.getItem(USER_ID);
    }

    public saveRol(user: string):void {
      window.sessionStorage.removeItem(USER_ROL);
      window.sessionStorage.setItem(USER_ROL, user);
    }
  
    public getRol():any{
      return window.sessionStorage.getItem(USER_ROL);
    }

    public isLoggedIn():any{
      const user = window.sessionStorage.getItem(USER_KEY);
      if(user){
        return true;
      }
      return false;
      }

    isAuthenticate(): boolean{
      const token = window.sessionStorage.getItem(TOKEN_KEY);
      if(token != null){
      return !this.jwtHelper.isTokenExpired(token);
      }else{ 
        return false;
      }
    }

}