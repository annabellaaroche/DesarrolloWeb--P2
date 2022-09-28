import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/TipoUser';
import { TipoUserService } from 'src/app/services/tipo-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(
    private servicioTipoUser: TipoUserService,
    private route: ActivatedRoute,
    ) { }
  admin_user =false;
  id_usuario =0;
  tipo_usuario =0;
  ngOnInit(): void {
    this.id_usuario = this.route.snapshot.params['id_usuario'];
    this.tipo_usuario = this.route.snapshot.params['tipo_usuario'];
    if(this.tipo_usuario>0){
      this.admin_user = true;
    }else{
      this.admin_user = false;
    }
    this.servicioTipoUser.disparadorDeTipoUser.subscribe(data =>{
      //this.user = data;
      //console.log('user',this.user);
    })
  }

}
