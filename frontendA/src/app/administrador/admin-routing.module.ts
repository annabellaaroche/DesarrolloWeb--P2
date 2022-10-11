import { createComponent, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { EditarComponent } from './editar/editar.component';
import { AdminiComponent } from './admini/admini.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { MarcajeComponent } from './marcaje/marcaje.component';
import { GuardGuard } from '../guards/guard.guard';
import { Pagina404Component } from '../pagina404/pagina404.component';

const routes: Routes = [
  {
      path: 'admini',
      component: AdminiComponent,
      children: [
          {
              path: 'editar/:id',
              component: EditarComponent,
              canActivate: [GuardGuard]
          },
          {
            path: 'admin',
            component: AdminComponent,
            canActivate: [GuardGuard]
        },
        {
          path: 'view/:id',
          component: ViewComponent,
          canActivate: [GuardGuard]
      },
      {
        path: 'create',
        component: CreateComponent,
        canActivate: [GuardGuard]
    },
    {
      path: 'marcaje',
      component: MarcajeComponent,
      canActivate: [GuardGuard]
    }
       ]
  }, 
  {path: 'pagina404', component: Pagina404Component},
  { path: '**', redirectTo: 'pagina404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
