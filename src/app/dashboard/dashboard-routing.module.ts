import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {TabsComponent} from "./components/tabs/tabs.component";
import {FooComponent} from "../foo/foo.component";

const routes: Routes = [
  {
    path: ':tabs/:spacing',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: TabsComponent,
      }
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
