import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  @Output() disparadorDeTipoUser: EventEmitter<any> = new EventEmitter();
  AsistenciasRef!: AngularFireList<any>;
  AsistenciaRef!: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}

  GetAsistenciaList() {
    this.AsistenciasRef = this.db.list('asistencia');
    return this.AsistenciasRef;
  }
  GetAsistencia(id: string) {
    this.AsistenciaRef = this.db.object('asistencia/' + id);
    return this.AsistenciaRef;
  }
}
