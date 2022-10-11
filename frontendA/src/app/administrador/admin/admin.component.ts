import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { MarcajeService } from 'src/app/services/marcaje.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usuario: Usuario[] = [];
  id_user =0;
  tipo_usuario =0;
  constructor(
    public marcajeService: MarcajeService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenStorageService

    ) { }
    
  ngOnInit(): void {
    this.id_user = this.tokenService.getID();
    this.tipo_usuario = this.tokenService.getRol();
    this.marcajeService.getAll().subscribe((data: Usuario[])=>{
      this.usuario = data;
      
    })  
  }
  deleteUsuario(id:number){
    this.marcajeService.delete(id).subscribe(res => {
         this.usuario = this.usuario.filter(item => item.usuario_id !== id);
         console.log('usuario deleted successfully!');
    })
  }
}
