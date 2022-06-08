import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {OtherServiceService} from "./services/other-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  route$!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public otherService: OtherServiceService
  ) {
  }

  ngOnInit(): void {
    this.route$ = this.route
      .params
      .subscribe(({tabs, spacing}) => {
        this.otherService.setData(tabs);
        this.otherService.setSpacing(spacing);
      });
  }

  async editTabs(
    tabs: number,
  ): Promise<void> {
    await this.router.navigate(['/dashboard', tabs, this.otherService.getSpacing().value], {relativeTo: this.route});
  }

  async editSpacings(
    spacings: number,
  ): Promise<void> {
    await this.router.navigate(['/dashboard', this.otherService.getData().value, spacings], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.route$.unsubscribe();
  }
}
