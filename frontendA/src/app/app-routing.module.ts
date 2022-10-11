import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminiComponent } from './administrador/admini/admini.component';
import { GuardGuard } from './guards/guard.guard';
import { LoginComponent } from './login/login.component';
import { Pagina404Component } from './pagina404/pagina404.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'admini', component: AdminiComponent, canActivate: [GuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
