import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {TabsComponent} from './components/tabs/tabs.component';
import {FooComponent} from "../foo/foo.component";
import {AppRoutingModule} from "../app-routing.module";
import {RouterModule} from "@angular/router";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  declarations: [
    DashboardComponent,
    TabsComponent
  ],
  imports: [
    FooComponent,
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    MatButtonToggleModule,
    MatGridListModule
  ]
})
export class DashboardModule {
}
