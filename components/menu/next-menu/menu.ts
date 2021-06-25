/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { TemplateRef } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export abstract class NzMenu {}

export abstract class NzMenuItem {
  abstract parentMenu: NzMenu;
}

export abstract class NzMenuItemTemplate {
  abstract templateRef: TemplateRef<NzSafeAny>;
}