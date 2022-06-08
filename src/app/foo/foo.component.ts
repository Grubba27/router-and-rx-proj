import {Component, OnInit} from '@angular/core';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {Route, Router, RouterModule, Routes} from "@angular/router";
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
export class FooComponent implements OnInit {


  constructor(
    private router: Router,
    private otherService: OtherServiceService
  ) {
  }

  ngOnInit(): void {
  }


  async addNested(): Promise<void> {
    this.otherService.setData(this.otherService.getData().value + 1);
    const times = this.otherService.getDataAsInArray();
    const nested: Routes = [{
      path: ':n',
      component: FooComponent,
      children: []
    }];
    const handleArrayDepth = (nested: Routes) => {
      nested?.forEach(({children, path, component}) => {
        if (children?.length) {
          handleArrayDepth(children);
        } else {
          children?.push({
            path: ':n',
            component: FooComponent,
            children: []
          });
        }
      });
    };

    handleArrayDepth(nested);
    console.log(nested);
    this.router.resetConfig([{
      path: 'home',
      component: FooComponent,
      children: nested
    }, ...this.router.config]);

    await this.router.navigate(['/home', ...this.otherService.getDataAsInArray()]);
  }
}
