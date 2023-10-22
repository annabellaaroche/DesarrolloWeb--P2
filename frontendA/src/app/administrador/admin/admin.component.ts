import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { MarcajeService } from 'src/app/services/marcaje.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usuario!: any[];
  id_user =0;
  tipo_usuario =0;
  noData: boolean = false;
  constructor(
    public marcajeService: MarcajeService,
    public crudApi: AuthService,

    ) { }
    
  ngOnInit(): void {
    this.dataState();
    let s = this.crudApi.GetUsuariosList();
    s.snapshotChanges().subscribe(data => {
      this.usuario = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        this.usuario.push(a as Usuario);
        console.log(this.usuario);
      })
    })
    }

  dataState() {     
    this.crudApi.GetUsuariosList().valueChanges().subscribe(data => {
      if(data.length <= 0){
        this.noData = true;
      } else {
        this.noData = false;
      }
    })
  }
  deleteUsuario(id:number){
    this.marcajeService.delete(id).subscribe(res => {
         this.usuario = this.usuario.filter(item => item.$key !== id);
         console.log('usuario deleted successfully!');
    })
  }
}
