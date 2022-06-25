import {Component, NgZone, OnInit} from '@angular/core';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {Router, RouterModule, Routes} from "@angular/router";
import {OtherServiceService} from "../dashboard/services/other-service.service";

@Component({
  selector: 'app-foo',
  standalone: true,
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.scss'],
  imports: [
    MatButtonToggleModule,
    RouterModule,
  ]
})
export class FooComponent {

  nested: Routes = [{
    path: ':n',
    component: FooComponent,
    children: []
  }];

  constructor(
    private router: Router,
    private otherService: OtherServiceService,
  ) {
  }

  async addNested(): Promise<void> {
    this.otherService.setData(this.otherService.getData().value + 1);
    const times = this.otherService.getDataAsInArray();
    const handleArrayDepth = (nested: Routes) => {
      return nested.map((obj) => {
        if (obj.children !== undefined && obj.children.length > 0) {
          handleArrayDepth(obj.children);
        } else {
          obj.children = [];
          obj.children.push({
            path: ':n',
            component: FooComponent,
            children: [{
              path: ':n',
              component: FooComponent,
              children: []
            }]
          });
        }

        return obj;
      });
    };
    this.router.resetConfig([{
      path: 'home',
      component: FooComponent,
      children: handleArrayDepth(this.nested) // recursive func que aumenta a profundidade do array
    }, ...this.router.config]);

    await this.router.navigate(['/home', ...this.otherService.getDataAsInArray()]);
  }
}
