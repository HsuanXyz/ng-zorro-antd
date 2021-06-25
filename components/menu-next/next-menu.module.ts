/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzOverflowModule } from 'ng-zorro-antd/cdk/overflow';

import { NzMenuNextItemComponent } from './nz-menu-next-item.component';
import { NzMenuNextItemDirective } from './nz-menu-next-item.directive';
import { NzNavMenuComponent } from './nz-nav-menu.component';
import { NzMenuNextComponent } from './nz-next-menu.component';
import { NzMenuTriggerForDirective } from './nz-menu-trigger-for.directive';

const COMPONENTS = [NzMenuNextComponent, NzMenuNextItemComponent, NzMenuNextItemDirective, NzNavMenuComponent];

@NgModule({
  declarations: [COMPONENTS, NzMenuTriggerForDirective],
  exports: [COMPONENTS],
  imports: [CommonModule, NzOverflowModule]
})
export class NzMenuNextModule {}
