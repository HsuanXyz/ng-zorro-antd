/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzOverflowModule } from 'ng-zorro-antd/cdk/overflow';
import { NzDestroyService } from 'ng-zorro-antd/core/services';

import { NextMenuItemComponent } from './next-menu-item.component';
import { NextSubmenuComponent } from './next-submenu.component';
import { NzMenuItemDirective } from './nz-menu-item.directive';
import { NzNextMenuComponent } from './nz-next-menu.component';

const declarations = [NzNextMenuComponent, NextMenuItemComponent, NzMenuItemDirective, NextSubmenuComponent];

@NgModule({
  declarations: [declarations],
  exports: [declarations],

  imports: [CommonModule, NzOverflowModule, OverlayModule],
  providers: [NzDestroyService]
})
export class NzNextMenuModule {}
