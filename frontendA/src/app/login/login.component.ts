import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Usuario } from '../models/usuario';
import { MarcajeService } from '../services/marcaje.service';
import { TipoUserService } from '../services/tipo-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  log=false;
  id_usuario=0;
  tipo_usuario=0;
  usuario: Usuario[] = [];
  constructor(
    private marcajeService: MarcajeService,
    private route: ActivatedRoute,
    private router: Router,
    private servicioTipoUser: TipoUserService
  ) { } 
  ngOnInit(

  ): void {
    this.form = new FormGroup({
      contrasena: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }
  get f(){
    return this.form.controls;
  }
ingresar(){
  if (!this.form.valid) {
    return ;
  }
  this.log=true;
  let user: Usuario = this.form.value;
  let email = user.email;
  let contrasena = user.contrasena;
  this.marcajeService.findByEmail(email).subscribe((data: Usuario[]) => {
    this.usuario = data;  
    let user = this.usuario.pop();
  if(user!=null){
    let emailb = user.email;
    let pass= user.contrasena;
    let activo = user.activo;
    this.id_usuario = user.id_usuario;
    this.tipo_usuario = user.tipo_usuario;
    let servicioUser = {tipo_usuario:this.tipo_usuario,user_id:this.id_usuario};
    this.servicioTipoUser.disparadorDeTipoUser.emit(
      {data:servicioUser}
    )
   if(emailb.match(email) && pass.match(contrasena)&& activo >0){
    this.log =true;
    this.router.navigateByUrl('/admini/marcaje/'+ this.id_usuario+'/'+this.tipo_usuario);
  } else{
    alert("Contraseña o Usuario Incorrecto")
  }
}
  })
}
}
