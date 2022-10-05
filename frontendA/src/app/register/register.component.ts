import { Component, ErrorHandler, OnInit } from '@angular/core';
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
      alert(
        'Datos Invalidos, porfavor revise la informacion'
      )
    }
    let usuario: Usuario = this.form.value;
    this.marcajeService.create(usuario).subscribe((res:any) => {
      alert(
        'Usuario Registrado Correctamente'
      )
         this.router.navigateByUrl('/');
      })
  }
}
