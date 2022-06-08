import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FooComponent} from "./foo/foo.component";

const routes: Routes = [
  {
    path: '',
    component: FooComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'home',
    component: FooComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
