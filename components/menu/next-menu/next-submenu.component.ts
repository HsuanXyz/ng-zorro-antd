/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Optional,
  QueryList,
  SkipSelf,
  ViewEncapsulation
} from '@angular/core';

import { NzOverflowItemDirective } from 'ng-zorro-antd/cdk/overflow';
import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { slideMotion, zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { POSITION_MAP } from 'ng-zorro-antd/core/overlay';
import { NzMenu, NzMenuItem, NzMenuItemTemplate } from 'ng-zorro-antd/menu/next-menu/menu';

const listOfVerticalPositions = [
  POSITION_MAP.rightTop,
  POSITION_MAP.right,
  POSITION_MAP.rightBottom,
  POSITION_MAP.leftTop,
  POSITION_MAP.left,
  POSITION_MAP.leftBottom
];

@Component({
  selector: 'nz-next-submenu',
  template: `
    <ng-template #contentIconTempRef>
      <ng-content select="[nz-submenu-icon]"></ng-content>
    </ng-template>

    <div class="ant-menu-submenu-title" cdkOverlayOrigin #origin="cdkOverlayOrigin">
      <span class="ant-menu-title-content" (click)="setOpen(!opened)">
        <ng-content select="[nz-submenu-title]"></ng-content>
      </span>
    </div>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="opened"
      [cdkConnectedOverlayPositions]="overlayPositions"
      [cdkConnectedOverlayTransformOriginOn]="'.ant-menu-submenu'"
    >
      <div
        [@slideMotion]="expandState"
        [@zoomBigMotion]="expandState"
        class="ant-menu-submenu ant-menu-submenu-popup ant-menu ant-menu-light ant-menu-submenu-placement-bottomLeft ant-menu-submenu-placement-bottom"
      >
        <ul class="ant-menu ant-menu-sub ant-menu-vertical">
          <ng-container *ngFor="let item of itemTemplates" [ngTemplateOutlet]="item.templateRef"></ng-container>
        </ul>
      </div>
    </ng-template>
  `,
  animations: [zoomBigMotion, slideMotion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ant-menu-overflow-item ant-menu-submenu ant-menu-submenu-horizontal'
  },
  providers: [
    { provide: NzMenuItem, useExisting: NextSubmenuComponent },
    { provide: NzOverflowItemDirective, useExisting: NextSubmenuComponent }
  ]
})
export class NextSubmenuComponent extends NzOverflowItemDirective implements NzMenuItem {
  @ContentChildren(NzMenuItemTemplate) itemTemplates!: QueryList<NzMenuItemTemplate>;
  opened = false;
  expandState = 'collapsed';
  overlayPositions = listOfVerticalPositions;
  constructor(
    protected nzResizeObserver: NzResizeObserver,
    protected elementRef: ElementRef,
    protected cdr: ChangeDetectorRef,
    @SkipSelf() @Optional() private parentSubmenu: NextSubmenuComponent,
    public parentMenu: NzMenu
  ) {
    super(nzResizeObserver, elementRef, cdr);
    console.log(this.parentSubmenu);
  }

  setOpen(open: boolean): void {
    this.opened = open;
    if (open) {
      this.expandState = 'bottom';
    } else {
      this.expandState = 'collapsed';
    }
  }
}
