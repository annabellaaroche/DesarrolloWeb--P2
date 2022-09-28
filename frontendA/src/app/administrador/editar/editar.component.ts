import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { MarcajeService } from 'src/app/services/marcaje.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  usuario_id!: number;
  usuario: Usuario = new Usuario();
  form!: FormGroup;

  constructor(
    public marcajeService: MarcajeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  id_usuario =0;
  tipo_usuario =0;
  ngOnInit(): void {
    this.usuario_id = this.route.snapshot.params['id'];
    this.id_usuario = this.route.snapshot.params['id_usuario'];
    this.tipo_usuario = this.route.snapshot.params['tipo_usuario'];
    this.marcajeService.find(this.usuario_id).subscribe((data: Usuario)=>{
      this.usuario = data;
    }); 
       
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      tipo_usuario: new FormControl('', Validators.required)
    });
  }

  get f(){
    return this.form.controls;
  }

  onSubmit(){
    if (!this.form.valid) {
      return;
    }
    let usuario: Usuario = this.form.value;
    this.marcajeService.update(this.usuario_id, usuario).subscribe((res:any) => {         
         this.router.navigateByUrl('admini/admin/'+this.id_usuario+'/'+this.tipo_usuario);
    })
  }

}