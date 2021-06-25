/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ContentChildren, OnInit, QueryList } from '@angular/core';

import { NZ_MENU_LAZY_ITEM, NzMenuLazyItem } from 'ng-zorro-antd/menu-next/item';
import { NZ_MENU } from 'ng-zorro-antd/menu-next/menu';

@Component({
  selector: 'nz-nav-menu',
  template: `
    <ul nzOverflowContainer class="ant-menu-overflow ant-menu ant-menu-root ant-menu-horizontal">
      <li nzOverflowItem class="ant-menu-overflow-item ant-menu-item" *ngFor="let item of lazyItems">
        <ng-container [ngTemplateOutlet]="item.templateRef"></ng-container>
      </li>
      <li
        nzOverflowRestOutlet
        class="ant-menu-overflow-item ant-menu-overflow-item-rest ant-menu-submenu ant-menu-submenu-horizontal"
      >
        ...
      </li>
    </ul>
  `,
  providers: [{ provide: NZ_MENU, useExisting: NzNavMenuComponent }]
})
export class NzNavMenuComponent implements OnInit {
  @ContentChildren(NZ_MENU_LAZY_ITEM) lazyItems!: QueryList<NzMenuLazyItem>;

  constructor() {}

  ngOnInit(): void {
    console.log();
  }
}
