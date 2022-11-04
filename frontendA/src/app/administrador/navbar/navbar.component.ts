import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/TipoUser';
import { TipoUserService } from 'src/app/services/tipo-user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(
    private servicioTipoUser: TipoUserService,
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    ) { }
  admin_user =false;
  reporter_user=false;
  id_usuario =0;
  tipo_usuario =0;
  ngOnInit(): void {
    this.id_usuario = this.tokenStorageService.getID();
    this.tipo_usuario = this.tokenStorageService.getRol();
    if(this.tipo_usuario==1){
      this.admin_user = true;
    }else if(this.tipo_usuario==2){
      this.admin_user = false;
      this.reporter_user = true;
    }
    this.servicioTipoUser.disparadorDeTipoUser.subscribe(data =>{
      //this.user = data;
      //console.log('user',this.user);
    })
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.replace("/")
  }

}
