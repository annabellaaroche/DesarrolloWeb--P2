import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { EditarComponent } from './editar/editar.component';
import { AdminiComponent } from './admini/admini.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MarcajeComponent } from './marcaje/marcaje.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AdminComponent,EditarComponent, AdminiComponent, ViewComponent, CreateComponent,NavbarComponent,MarcajeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdministradorModule { }
