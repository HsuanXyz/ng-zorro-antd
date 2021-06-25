/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, TemplateRef } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NZ_MENU_ITEM, NZ_MENU_LAZY_ITEM, NzMenuItem, NzMenuLazyItem } from 'ng-zorro-antd/menu-next/item';

@Directive({
  selector: 'ng-template[nzMenuNextItem]',
  providers: [
    {
      provide: NZ_MENU_ITEM,
      useExisting: NzMenuNextItemDirective
    },
    {
      provide: NZ_MENU_LAZY_ITEM,
      useExisting: NzMenuNextItemDirective
    }
  ]
})
export class NzMenuNextItemDirective implements NzMenuItem, NzMenuLazyItem {
  constructor(public templateRef: TemplateRef<NzSafeAny>) {}
}
