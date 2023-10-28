import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { MarcajeService } from 'src/app/services/marcaje.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  usuario_id!: string;
  usuario!: Usuario;
  form!: FormGroup;

  constructor(
    public marcajeService: MarcajeService,
    private route: ActivatedRoute,
    private router: Router,
    private crudApi: AuthService,
    private fb: FormBuilder,

  ) { }
  ngOnInit(): void {
    this.updateUserData();
    this.usuario_id = this.route.snapshot.params['id']; //ID del Usuario a ver
    console.log(this.usuario_id);
    this.crudApi.GetUsuario(this.usuario_id).
    valueChanges()
    .subscribe((data)=>{
      this.form.setValue(data);
      console.log(this.form.value);
    })
  }

  updateUserData() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['',[Validators.required,Validators.minLength(2)]],
      cardUID: ['', [Validators.required]],
      userStatus:[0],
    });
   // this.form.controls['CardUID'].disable();
  }

get f(){
  return this.form.controls;
}
  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.form.patchValue({userStatus:1});
    console.log("VALOR",this.form.value);
    this.crudApi.UpdateUsuario(this.form.value);
    console.log("Usuario Editado Con exito")
    this.router.navigateByUrl('admini/admin');
  }

}