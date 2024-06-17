import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserRegister } from '../../interfaces/user-register';
import { getAuth, updateProfile } from 'firebase/auth';
import { UtilsService } from '../utils.service';
import { Observable } from 'rxjs';
import { Actividad } from '../../interfaces/actividad';

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

  getActivities(): Observable<any[]>{
    return this.db.collection('actividades').valueChanges();
  }

  getMyActivities(idAuthor: String): Observable<any[]>{
    // ref hace referencia a las entidades que estamos extrallendo y solo traemos las que coiciden con el idAuthor
    return this.db.collection('actividades', ref => ref.where('idAuthor', '==', idAuthor) ).valueChanges();
  }

  postActivity(activity: Actividad): void{
    this.db.collection('actividades').add(activity);
  }

  updateActivity(activity: Actividad):void{
    this.db.collection('actividades', ref => ref.where('id', '==', activity.id)).get().subscribe(entity => {
      if (!entity.empty) {
        const docId = entity.docs[0].id;
        this.db.collection('actividades').doc(docId).update({
          title: activity.title,
          description: activity.description,
          photo: activity.photo
        });
      }
    });
  }
  
  deleteActivity(activity: Actividad): void{
    console.log(activity.id)
    this.db.collection('actividades', ref => ref.where('id', '==', activity.id)).get().subscribe(snapshot => {
      if (!snapshot.empty) {
       console.log("hola") 
      const docId = snapshot.docs[0].id;
              this.db.collection('actividades').doc(docId).delete();
            }
          });
  }
}
