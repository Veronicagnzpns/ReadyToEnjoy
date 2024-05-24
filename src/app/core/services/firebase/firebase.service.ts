import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserRegister } from '../../interfaces/user-register';
import { getAuth, updateProfile } from 'firebase/auth';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private utilsSvc: UtilsService
  ) { }

  login(user: UserRegister){
    return this.auth.signInWithEmailAndPassword(user.email, user.password)
  }

  singUp(user: UserRegister){
    return this.auth.createUserWithEmailAndPassword(user.email, user.password)
  }

  updateUser(user: any){
    const  auth = getAuth();
    return updateProfile(auth.currentUser, user)
  }

  getAuthState(){
    return this.auth.authState
  }

  async singOut(){
    await this.auth.signOut();
    this.utilsSvc.routerLink('/login');
    localStorage.removeItem('user')
  }

  getSubcollection(path:string, subcollectionName: string){
    return this.db.doc(path).collection(subcollectionName).valueChanges()
  }
}
