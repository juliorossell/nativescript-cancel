import { Component, OnInit } from '@angular/core'
import { tap } from 'rxjs/operators';

import { Item } from './item'
import { ItemService } from './item.service'

@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
})
export class ItemsComponent implements OnInit {
  items: Array<Item>

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getItems();
    this.watchChildrenChange();
  }

  watchChildrenChange() {
    this.itemService.changeChildren$
      .pipe(
        tap(() => console.log('recibiendo desde el padre.')),
        tap(res => console.log(res))
      )
      .subscribe();
  }
}
