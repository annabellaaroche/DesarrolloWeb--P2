import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUser } from '../models/auth.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  usuario: AuthUser = new AuthUser;
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }
  ngOnInit(): void {

    this.form = new FormGroup({
      password: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required)
    });
  }
  get f() {
    return this.form.controls;
  }
  ingresar() {
    if (!this.form.valid) {
      return;
    }
    let user = this.form.value;
    this.loginService.GetUsuario(this.form.value.userName).valueChanges()
    .subscribe((data)=>{
      if(data!=null){
        if(user.password==data.password){
          this.router.navigateByUrl('admini/admin');
        }else{
          this.errorMessage="Nombre de usuario o contraseña incorrectos";
          console.log(this.errorMessage);
        }
      }else{
        this.errorMessage="Nombre de usuario o contraseña incorrectos";
        console.log(this.errorMessage);
      }
    })
  }
}
