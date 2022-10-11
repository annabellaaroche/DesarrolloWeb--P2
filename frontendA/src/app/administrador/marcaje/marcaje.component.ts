import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, share, Subscription, timer } from 'rxjs';
import { Marcado } from 'src/app/models/marcado';
import { MarcajeService } from 'src/app/services/marcaje.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-marcaje',
  templateUrl: './marcaje.component.html',
  styleUrls: ['./marcaje.component.css']
})
export class MarcajeComponent implements OnInit {
  //declaracion de variables
  today=new Date(); 
  fecha ='';
  hora ='';
  entrada:boolean=true;
  id_usuario= 0;
  id_estado=0;
  tipo_usuario=0;
  marcado: Marcado = new Marcado();
  lastMarcaje: Marcado[]=[];
  time = new Date();
  rxTime = new Date();
  subscription: Subscription | undefined;

  //contructor Servicios
  constructor(
    private marcajeService: MarcajeService,
    private route: ActivatedRoute,
    private tokenService: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.id_usuario = this.tokenService.getID();
    
    this.setDate();
    this.marcajeService.getMarcajeByUser(this.id_usuario,this.fecha).subscribe((data:Marcado[])=>{
    this.lastMarcaje = data;
    let ultimoRegistro = this.lastMarcaje.pop();
    if(ultimoRegistro!=null){
      this.entrada=false;
      this.fecha=ultimoRegistro.fecha;
      this.hora= ultimoRegistro.hora;
      this.id_estado=2;
    }
  });

  // Timer - Para reloj
  this.subscription = timer(0, 1000)
    .pipe(
      map(() => new Date()),
      share()
    )
    .subscribe(time => {
      this.rxTime = time;
    });
}
//Funcion marcaje
  Marcaje(){    
    if(this.entrada!=false){
      this.entrada =false;
      this.marcar(1);
    }else{
      this.marcar(2);
    }
  }

  setDate(){
    this.today=new Date();
    this.fecha = formatDate(this.today, 'MM-dd-yyyy'	, 'en-US');
    this.hora = formatDate(this.today, 'h:mm:ss a'	, 'en-US');
  }
//funcion marcar/recibe estado, devulve informacion de marcaje
  marcar(id_estado: number){
    this.setDate();
    this.marcado.usuario_id=this.id_usuario;
    this.marcado.tipo_marcaje_id=id_estado;
    this.marcado.fecha=this.fecha;
    this.marcado.hora =this.hora;
    this.marcajeService.createMarcaje(this.marcado).subscribe((res:any) => {
    })    
      alert("Marcaje con exito, tu ultimo marcaje fue a las "+this.fecha +this.hora);
    
  }
}
