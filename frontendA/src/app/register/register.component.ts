import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { MarcajeService } from 'src/app/services/marcaje.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  
  constructor(
    private marcajeService: MarcajeService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  id_usuario =0;
  tipo_usuario =0;
  ngOnInit(): void {
    this.id_usuario = this.route.snapshot.params['id_usuario'];
    this.tipo_usuario = this.route.snapshot.params['tipo_usuario'];
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      tipo_usuario: new FormControl('0', Validators.required)
    });
  }

  get f(){
    return this.form.controls;
  }

  onSubmit(){
    if (!this.form.valid) {
      return ;
    }
    let usuario: Usuario = this.form.value;
    this.marcajeService.create(usuario).subscribe((res:any) => {
      alert(
        'Exito success'
      )
         this.router.navigateByUrl('admini/admin/'+this.id_usuario+'/'+this.tipo_usuario);
    })
  }
}
