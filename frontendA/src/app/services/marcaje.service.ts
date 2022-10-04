import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { Marcado } from '../models/marcado';
@Injectable({
  providedIn: 'root'
})
export class MarcajeService {

  private apiURL = "http://127.0.0.1:8000/api";
    
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  constructor(private httpClient: HttpClient) { }
    
  getAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.apiURL + '/usuarios')
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  create(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.apiURL + '/register', JSON.stringify(usuario), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  find(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.apiURL + '/usuario/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  findByEmail(email:string): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.apiURL + '/usuario/email/' + email)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id: number, usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(this.apiURL + '/usuario/' + id, JSON.stringify(usuario), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(id: number){
    return this.httpClient.put<Usuario>(this.apiURL + '/usuario/delete/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
   
  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

 getAllMarcaje(): Observable<Marcado[]> {
  return this.httpClient.get<Marcado[]>(this.apiURL + '/marcajeD')
  .pipe(
    catchError(this.errorHandler)
  )
}

getMarcajeByUser(id: number, fecha:string): Observable<Marcado[]> {
  return this.httpClient.get<Marcado[]>(this.apiURL + '/marcajeD/user/'+ id +'/'+ fecha)
  .pipe( 
    catchError(this.errorHandler)
  )
}
createMarcaje(marcaje: Marcado): Observable<Marcado> {
  return this.httpClient.post<Marcado>(this.apiURL + '/marcajeD', JSON.stringify(marcaje), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}  
}