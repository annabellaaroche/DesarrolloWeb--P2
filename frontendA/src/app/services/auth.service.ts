import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  UsuariosRef!: AngularFireList<any>;
  UsuarioRef!: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}
  // Create Usuario
  AddUsuario(usuario: Usuario) {
    this.UsuariosRef.push({
      $key:usuario.$key,
      nombre: usuario.nombre,
      email: usuario.email,
      password: usuario.password,
    });
  }
  // Fetch Single Usuario Object
  GetUsuario(id: string) {
    this.UsuarioRef = this.db.object('usuarios/' + id);
    return this.UsuarioRef;
  }
  // Fetch Usuarios List
  GetUsuariosList() {
    this.UsuariosRef = this.db.list('usuarios');
    return this.UsuariosRef;
  }
  // Update Usuario Object
  UpdateUsuario(usuario: Usuario) {
    this.UsuarioRef.update({
      $key:usuario.$key,
      nombre: usuario.nombre,
      email: usuario.email,
      password: usuario.password,
    });
  }
  // Delete Usuario Object
  DeleteUsuario(id: string) {
    this.UsuarioRef = this.db.object('usuarios/' + id);
    this.UsuarioRef.remove();
  }
}