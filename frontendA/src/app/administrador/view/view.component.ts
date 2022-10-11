import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { MarcajeService } from 'src/app/services/marcaje.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id_usuario!: number;
  usuario: Usuario = new Usuario();
  id_user =0;
  tipo_usuario =0;
  constructor(
    private marcajeService: MarcajeService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenStorageService,
  ) { }

  ngOnInit(): void {  
    this.id_usuario = this.route.snapshot.params['id'];
    this.id_user = this.tokenService.getID();
    this.tipo_usuario = this.tokenService.getRol();
    this.marcajeService.find(this.id_usuario).subscribe((data: Usuario)=>{
      this.usuario = data;
    });
  }
}
