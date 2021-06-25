/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  forwardRef,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  Optional,
  QueryList,
  SkipSelf,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { startWith, takeUntil } from 'rxjs/operators';

import { NzOverflowContainerDirective } from 'ng-zorro-antd/cdk/overflow';
import { ANTD_PREFIX } from 'ng-zorro-antd/core/prefix/prefix';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzMenuModeType, NzMenuThemeType } from 'ng-zorro-antd/menu/menu.types';

export interface NzMenuContainer {
  parentMenu: NzMenuContainer | null;
  classNamePrefix: string;
  inlineIndent: number;
  nzMode: NzMenuModeType;
  getLevel(): number;
}

export interface NzMenuItem {
  parentMenu: NzMenuContainer;

  changeStatus(): void;
}

export const NZ_MENU_CONTAINER = new InjectionToken<NzMenuContainer>('NZ_MENU_CONTAINER');
export const NZ_MENU_ITEM = new InjectionToken<NzMenuItem>('NZ_MENU_ITEM');

@Directive({
  selector: 'ng-template[nzMenuItem]'
})
export class NzMenuItemTempDirective {
  constructor(public templateRef: TemplateRef<NzSafeAny>) {}
}
@Component({
  selector: 'nz-menu',
  template: `
    <ul #overflowContainer nzOverflowContainer [class]="classList">
<!--      <li nzOverflowItem *ngFor="let item of allItemTemps" [ngTemplateOutlet]="item.templateRef"></ng-container>-->
    </ul>
  `,
  providers: [
    { provide: NZ_MENU_CONTAINER, useExisting: forwardRef(() => NzMenuComponent) },
    { provide: ANTD_PREFIX, useValue: 'ant-dropdown' }
  ]
})
export class NzMenuComponent implements NzMenuContainer, OnChanges, AfterViewInit {
  @Input('nzInlineIndent') inlineIndent = 24;
  @Input() nzTheme: NzMenuThemeType = 'light';
  @Input() nzMode: NzMenuModeType = 'vertical';
  @Input() @InputBoolean() nzInlineCollapsed = false;

  @ViewChild(NzOverflowContainerDirective) overflowContainer!: NzOverflowContainerDirective;
  @ContentChildren(NZ_MENU_ITEM, { descendants: true }) allItems = new QueryList<NzMenuItem>();
  @ContentChildren(NzMenuItemTempDirective) allItemTemps = new QueryList<NzMenuItemTempDirective>();
  private directDescendantItems = new QueryList<NzMenuItem>();

  readonly classNamePrefix = 'ant';
  classList: Record<string, boolean> = {};

  constructor(
    @Inject(NZ_MENU_CONTAINER) @SkipSelf() @Optional() public readonly parentMenu: NzMenuContainer | null,
    @Optional() private directionality: Directionality,
    private cdr: ChangeDetectorRef,
    private destroyService: NzDestroyService
  ) {
    this.setClassList();
    this.subscribeDirChange();
  }

  getLevel(): number {
    return 0;
  }

  private subscribeDirChange(): void {
    this.directionality.change.pipe(takeUntil(this.destroyService)).subscribe(() => this.setClassList());
  }

  private subscribeDirectDescendants(): void {
    this.allItems.changes.pipe(startWith(this.allItems)).subscribe((items: QueryList<NzMenuItem>) => {
      const directDescendantItems = items.filter(item => item.parentMenu === this);
      this.directDescendantItems.reset(directDescendantItems);
      this.directDescendantItems.notifyOnChanges();
    });
  }

  private setClassList(): void {
    const prefix = this.parentMenu?.classNamePrefix || this.classNamePrefix;
    const actualMode = this.nzMode === 'inline' && this.nzInlineCollapsed ? 'vertical' : this.nzMode;
    this.classList = {
      [`${prefix}-menu`]: true,
      [`${prefix}-menu-root`]: true,
      [`${prefix}-menu-rtl`]: this.directionality.value === 'rtl',
      [`${prefix}-menu-light`]: this.nzTheme === 'light',
      [`${prefix}-menu-dark`]: this.nzTheme === 'dark',
      [`${prefix}-menu-vertical`]: actualMode === 'vertical',
      [`${prefix}-menu-horizontal`]: actualMode === 'horizontal',
      [`${prefix}-menu-overflow`]: actualMode === 'horizontal',
      [`${prefix}-menu-inline`]: actualMode === 'inline',
      [`${prefix}-menu-inline-collapsed`]: this.nzInlineCollapsed
    };
    this.cdr.markForCheck();
  }

  ngOnChanges(): void {
    this.setClassList();
    this.directDescendantItems.forEach(item => item.changeStatus());
  }

  ngAfterViewInit(): void {
    console.log(this.allItemTemps);
    this.subscribeDirectDescendants();
  }
}
