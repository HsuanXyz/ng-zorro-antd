/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, TemplateRef } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMenuItemTemplate } from 'ng-zorro-antd/menu/next-menu/menu';

@Directive({
  selector: 'ng-template[nzNextMenuItem]',
  providers: [{ provide: NzMenuItemTemplate, useExisting: NzMenuItemDirective }]
})
export class NzMenuItemDirective implements NzMenuItemTemplate {
  constructor(public templateRef: TemplateRef<NzSafeAny>) {}
}
