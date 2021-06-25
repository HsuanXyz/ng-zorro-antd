/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  Inject,
  Input,
  OnChanges,
  Optional,
  Output,
  SkipSelf
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { NzOverflowItemDirective } from 'ng-zorro-antd/cdk/overflow';
import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NZ_MENU_CONTAINER, NZ_MENU_ITEM, NzMenuContainer, NzMenuItem } from 'ng-zorro-antd/menu/menu.component';

@Directive({
  selector: 'nz-menu-item[nzSubmenu]:not([nzSelected])',
  host: {
    '[class]': 'classList'
  },
  providers: [{ provide: NZ_MENU_CONTAINER, useExisting: forwardRef(() => NzSubmenuItemDirective) }]
})
export class NzSubmenuItemDirective implements NzMenuContainer {
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzOpen = false;
  @Output() readonly nzOpenChange: EventEmitter<boolean> = new EventEmitter();

  isSelected = false;
  isActive = false;
  classList: Record<string, boolean> = {};

  get inlineIndent() {
    return this.parentMenu.inlineIndent;
  }

  get classNamePrefix() {
    return this.parentMenu.classNamePrefix;
  }

  get nzMode() {
    return this.parentMenu.nzMode;
  }

  constructor(
    @Inject(NZ_MENU_CONTAINER) @SkipSelf() public readonly parentMenu: NzMenuContainer,
    private cdr: ChangeDetectorRef
  ) {
    this.setClassList();
  }

  getLevel(): number {
    let level = 0;
    let parentMenu: NzMenuContainer | null = this.parentMenu;
    while (parentMenu) {
      level++;
      parentMenu = parentMenu.parentMenu;
    }
    return level;
  }

  setClassList(): void {
    const { classNamePrefix: prefix } = this.parentMenu;

    this.classList = {
      [`${prefix}-menu-submenu`]: true,
      [`${prefix}-menu-submenu-disabled`]: this.nzDisabled,
      [`${prefix}-menu-submenu-open`]: this.nzOpen,
      [`${prefix}-menu-submenu-selected`]: this.isSelected,
      [`${prefix}-menu-submenu-active`]: this.isActive,
      [`${prefix}-menu-submenu-vertical`]: this.nzMode === 'vertical',
      [`${prefix}-menu-submenu-horizontal`]: this.nzMode === 'horizontal',
      [`${prefix}-menu-submenu-inline`]: this.nzMode === 'inline'
    };
    this.cdr.markForCheck();
  }

  changeStatus(): void {
    this.setClassList();
  }
}

@Component({
  selector: 'nz-menu-item',
  template: `
    <ng-template #contentTitleTempRef>
      <ng-content select="[nz-submenu-title]"></ng-content>
    </ng-template>

    <ng-template #contentDefaultTempRef>
      <ng-content></ng-content>
    </ng-template>

    <ng-container *ngIf="!isSubmenu">
      <span [class]="parentMenu.classNamePrefix + '-menu-title-content'">
        <ng-container *ngTemplateOutlet="contentTitleTempRef"></ng-container>
        <ng-container *ngTemplateOutlet="contentDefaultTempRef"></ng-container>
      </span>
    </ng-container>
    <div *ngIf="isSubmenu" [class]="parentMenu.classNamePrefix + '-menu-submenu-title'">
      <span [class]="parentMenu.classNamePrefix + '-menu-title-content'">
        <ng-container *ngTemplateOutlet="contentTitleTempRef"></ng-container>
        <ng-container *ngTemplateOutlet="contentDefaultTempRef"></ng-container>
      </span>
    </div>
  `,
  host: {
    '[class]': 'classList',
    '[style.paddingLeft.px]': `dir === 'rtl' ? null : inlinePadding`,
    '[style.paddingRight.px]': `dir === 'rtl' ? inlinePadding : null`
  },
  providers: [
    { provide: NZ_MENU_ITEM, useExisting: forwardRef(() => NzMenuItemComponent) },
    { provide: NzOverflowItemDirective, useExisting: forwardRef(() => NzMenuItemComponent) }
  ]
})
export class NzMenuItemComponent extends NzOverflowItemDirective implements OnChanges, NzMenuItem {
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzSelected: BooleanInput;
  static ngAcceptInputType_nzDanger: BooleanInput;
  static ngAcceptInputType_nzMatchRouterExact: BooleanInput;
  static ngAcceptInputType_nzMatchRouter: BooleanInput;

  @Input() nzPaddingLeft?: number;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzSelected = false;
  @Input() @InputBoolean() nzDanger = false;
  @Input() @InputBoolean() nzMatchRouterExact = false;
  @Input() @InputBoolean() nzMatchRouter = false;

  classList: Record<string, boolean> = {};
  dir: Direction = 'ltr';
  inlinePadding: number | null = null;

  get isSubmenu(): boolean {
    return !!this.submenuItemDirective;
  }

  constructor(
    @Inject(NZ_MENU_CONTAINER) public readonly parentMenu: NzMenuContainer,
    @Optional() private directionality: Directionality,
    @Optional() @Host() private submenuItemDirective: NzSubmenuItemDirective,
    nzResizeObserver: NzResizeObserver,
    public elementRef: ElementRef,
    protected cdr: ChangeDetectorRef,
    private destroyService: NzDestroyService
  ) {
    super(nzResizeObserver, elementRef, cdr);
    this.changeStatus();
    this.subscribeDirChange();
  }

  private subscribeDirChange(): void {
    this.directionality.change.pipe(takeUntil(this.destroyService)).subscribe(dir => {
      this.dir = dir;
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(): void {
    this.changeStatus();
  }

  private setClassList(): void {
    const { classNamePrefix: prefix } = this.parentMenu;
    if (!this.isSubmenu) {
      this.classList = {
        [`${prefix}-menu-item`]: true,
        [`${prefix}-menu-item-selected`]: this.nzSelected,
        [`${prefix}-menu-item-danger`]: this.nzDanger,
        [`${prefix}-menu-item-disabled`]: this.nzDisabled
      };
    }
    this.cdr.markForCheck();
  }

  private setInlinePadding(): void {
    this.inlinePadding =
      this.parentMenu.nzMode === 'inline' ? this.parentMenu.inlineIndent * this.parentMenu.getLevel() : null;
    this.cdr.markForCheck();
  }

  changeStatus(): void {
    this.submenuItemDirective?.changeStatus();
    this.setClassList();
    this.setInlinePadding();
  }
}
