import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminiComponent } from './administrador/admini/admini.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  { path: 'admini', component: AdminiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
