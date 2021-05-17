import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { forkJoin, Subject, Subscription } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Item } from './item'
import { ItemService } from './item.service'

@Component({
  selector: 'ns-details',
  templateUrl: './item-detail.component.html',
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  item: Item;
  text = 'cargando...';

  private destroy$ = new Subject();
  search$ = new Subject<void>();
  subscriptions = new Subscription();

  constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.item = this.itemService.getItem(id);
    this.watchSearchObservable();
  }

  emitSearchObservable() {
    this.search$.next();
  }

  watchSearchObservable() {
    const fork = (param1, param2) => {
      return forkJoin([
        this.itemService.fakeDelay(param1),
        this.itemService.fakeDelay(param2)
      ])
    };

    const subs = this.search$
        .pipe(
          takeUntil(this.destroy$),
          map(() => { return { body: '12'} }),
          switchMap(({ body }) =>
              // this.securityService.fakeDelay(body)
              fork(body, 14)
          ),
          tap(() => this.text = 'loaded' + new Date()),
          tap(() => this.itemService.emitChangeChildren('emit desde hijo'))
          // tap((res) => console.log(res)),
        )
        .subscribe();
      this.subscriptions.add(subs);
  }

  ngOnDestroy() {
    // this.destroy$.next();
    // this.destroy$.complete();
    // this.search$.next();
    // this.search$.complete();
    // this.subscriptions.unsubscribe();
  }

  returnToLogin() {
    this.router.navigate(['items']);
  }
}
