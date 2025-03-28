import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { adminGuard } from './guards/admin.guard';
import { ClientesListComponent } from './components/clientes/clientes-list/clientes-list.component';

const routes: Routes = [
  {path: '', component: InicioComponent, canActivate: [adminGuard]},
  {
    path:'panel', children: [
      {path: 'clientes', component: ClientesListComponent, canActivate: [adminGuard]}
    ]
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
