import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map} from 'rxjs';
import { FirebaseService } from '../services/firebase/firebase.service';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.firebaseSvc.getAuthState().pipe(map(auth => {
          if(!auth){
            return true;
          }else{
            this.utilsSvc.routerLink('/home')
            return false;
          }
        }))

        
      
  }
  
}
