import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BehaviorSubject, map, Subscription, switchMap, tap} from 'rxjs';
import {FakeCallsService, StatusNames} from "../../services/fake-calls.service";
import {OtherServiceService} from "../../services/other-service.service";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnDestroy {

  api$!: Subscription;
  tabStatus$ = new BehaviorSubject(StatusNames.LOADING);
  data = '';

  constructor(
    public otherService: OtherServiceService,
    private api: FakeCallsService
  ) {
  }

  ngOnInit(): void {
    this.api$ = this.api
      .getSomeData(this.otherService.getData().value)
      .pipe(tap(({status}) => this.tabStatus$.next(status)))
      .subscribe(({data}) => this.data = data);
  }

  ngOnDestroy(): void {
    this.api$.unsubscribe();
  }

}
