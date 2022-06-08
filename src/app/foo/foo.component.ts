import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foo',
  standalone: true,
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.scss']
})
export class FooComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
