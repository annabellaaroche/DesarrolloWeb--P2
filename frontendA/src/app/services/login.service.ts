import { Injectable } from '@angular/core';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  Usuario!: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) { }

  GetUsuario(id: string) {
    this.Usuario = this.db.object('userLogin/' + id);
    return this.Usuario;
  }
}
