import {Component, Input} from "@angular/core";
import {module1, module2} from 'foo';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <ng-container *ngIf="param1 === param2">
      <div> true</div>
    </ng-container>
    <div>false{{input}}<span>{{other}}</span></div>`,
  imports: [module1, module2],
})
export class HeaderComponent {
  @Input() input;
  @Input() other;


  constructor(public param1: string, public param2: number) {
  }
}
