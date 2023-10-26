import { Component, OnInit } from '@angular/core';
import { Asistencia } from 'src/app/models/asistencia';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { AuthService } from 'src/app/services/auth.service';
import { MarcajeService } from 'src/app/services/marcaje.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';
  Asistencia!: any[];
  newAsistencia!: any[];
  ctr=0;
  tipo_asistencia=0;
  noData: boolean = false;

  constructor(
    public AsistenciaService: AsistenciaService,
    public crudApi: AsistenciaService,
  ) { }

  ngOnInit(): void {
    this.dataState();
    let s = this.crudApi.GetAsistenciaList();
    s.snapshotChanges().subscribe(data=>{
      this.Asistencia = [];
      this.newAsistencia=[];
      data.forEach(item=> {
        let a = item.payload.toJSON() as Asistencia;
        if(a.status.length!=0){
          this.Asistencia.push(a);
        }else{
          this.ctr++;
          this.newAsistencia.push(a);
        }

      })

    })
  


}  
dataState() {
  this.crudApi.GetAsistenciaList().valueChanges().subscribe(data => {
    if(data.length <= 0){
      this.noData = true;
    } else {
      this.noData = false;
    }
  })
  }
}
