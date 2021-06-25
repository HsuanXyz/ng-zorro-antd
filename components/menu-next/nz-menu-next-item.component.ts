/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NZ_MENU_ITEM, NzMenuItem } from 'ng-zorro-antd/menu-next/item';

@Component({
  selector: 'nz-menu-next-item',
  template: ` <ng-content></ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NZ_MENU_ITEM,
      useExisting: NzMenuNextItemComponent
    }
  ]
})
export class NzMenuNextItemComponent implements NzMenuItem {
  constructor() {}
}
