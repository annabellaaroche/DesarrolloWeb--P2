import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUser } from '../models/auth.model';
import { AuthService } from '../services/auth.service';
import { MarcajeService } from '../services/marcaje.service';
import { TipoUserService } from '../services/tipo-user.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  id_usuario=0;
  tipo_usuario=0;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  usuario: AuthUser= new AuthUser;
  constructor(
    private marcajeService: MarcajeService,
    private authService: AuthService, 
    private storageService: TokenStorageService,
    private router: Router,
    private servicioTipoUser: TipoUserService,
  ) { } 
  ngOnInit(): void {

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.usuario = this.storageService.getUser();
      window.location.replace('/admini/marcaje');
    }
    this.form = new FormGroup({
      password: new FormControl('', Validators.required),
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
  let user: AuthUser = this.form.value;
    this.authService.login(user).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.usuario = this.storageService.getUser();
        this.storageService.saveToken(this.usuario.token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        let usuario = this.usuario.user;
        this.storageService.saveUser(usuario);
        let user1 = this.storageService.getUser();
        this.id_usuario = user1[0].usuario_id;
        this.storageService.saveID(this.id_usuario.toString());
        this.tipo_usuario = user1[0].tipo_usuario;
        this.storageService.saveRol(this.tipo_usuario.toString());
        this.router.navigateByUrl('/admini/marcaje');
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
}
