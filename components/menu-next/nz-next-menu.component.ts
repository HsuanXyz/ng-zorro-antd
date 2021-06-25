/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { NzMenu, NZ_MENU } from './menu';

@Component({
  selector: 'nz-menu-next',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  providers: [{ provide: NZ_MENU, useExisting: NzMenuNextComponent }]
})
export class NzMenuNextComponent implements OnInit, NzMenu {
  constructor() {}

  ngOnInit(): void {
    console.log(1);
  }
}
