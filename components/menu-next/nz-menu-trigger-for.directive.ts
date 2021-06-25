/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input } from '@angular/core';

import { NzMenu } from './menu';

@Directive({
  selector: '[nzMenuTriggerFor]'
})
export class NzMenuTriggerForDirective {
  _menu: NzMenu | null = null;

  @Input('nzMenuTriggerFor')
  set menu(menu: NzMenu | null) {
    this._menu = menu;
  }
  get menu(): NzMenu | null {
    return this._menu;
  }

  constructor() {}
}
