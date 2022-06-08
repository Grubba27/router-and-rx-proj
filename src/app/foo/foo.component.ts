import {Component, OnInit} from '@angular/core';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {RouterModule} from "@angular/router";

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
