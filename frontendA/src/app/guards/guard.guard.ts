import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor( private tokenService: TokenStorageService,private router: Router ){}
  canActivate(): boolean {
    if(!this.tokenService.isAuthenticate()){
      this.router.navigate([''])
      return false;
    }
    return true;
  }
  
}
