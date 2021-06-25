/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';

import { NzOverflowItemDirective } from 'ng-zorro-antd/cdk/overflow';
import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { NzMenu, NzMenuItem } from 'ng-zorro-antd/menu/next-menu/menu';

@Component({
  selector: 'nz-next-menu-item',
  template: `
    <ng-template #contentIconTempRef>
      <ng-content select="[nz-menu-icon]"></ng-content>
    </ng-template>

    <ng-template #contentTitleTempRef>
      <ng-content select="[nz-menu-title]"></ng-content>
    </ng-template>

    <ng-content></ng-content>
  `,
  providers: [
    { provide: NzMenuItem, useExisting: NextMenuItemComponent },
    { provide: NzOverflowItemDirective, useExisting: NextMenuItemComponent }
  ],
  host: {
    class: 'ant-menu-item ant-menu-overflow-item'
  }
})
export class NextMenuItemComponent extends NzOverflowItemDirective implements NzMenuItem {
  constructor(
    protected nzResizeObserver: NzResizeObserver,
    protected elementRef: ElementRef,
    protected cdr: ChangeDetectorRef,
    public parentMenu: NzMenu
  ) {
    super(nzResizeObserver, elementRef, cdr);
  }
}
