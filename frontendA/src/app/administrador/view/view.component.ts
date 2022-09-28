import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { MarcajeService } from 'src/app/services/marcaje.service';

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
    private router: Router
  ) { }

  ngOnInit(): void {  
    this.id_usuario = this.route.snapshot.params['id'];
    this.id_user = this.route.snapshot.params['id_usuario'];
    this.tipo_usuario = this.route.snapshot.params['tipo_usuario'];
    this.marcajeService.find(this.id_usuario).subscribe((data: Usuario)=>{
      this.usuario = data;
    });
  }
}
