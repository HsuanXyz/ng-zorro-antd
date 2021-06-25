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
  ElementRef,
  Inject,
  Input,
  OnInit,
  Optional,
  QueryList
} from '@angular/core';
import { startWith, takeUntil } from 'rxjs/operators';

import { NzOverflowContainerDirective } from 'ng-zorro-antd/cdk/overflow';
import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { ANTD_PREFIX, PrefixProvide } from 'ng-zorro-antd/core/prefix/prefix';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzMenuModeType, NzMenuThemeType } from 'ng-zorro-antd/menu';
import { NzMenu, NzMenuItem, NzMenuItemTemplate } from 'ng-zorro-antd/menu/next-menu/menu';

@Component({
  selector: 'nz-next-menu',
  template: `
    <ng-container *ngFor="let item of itemTemplates" [ngTemplateOutlet]="item.templateRef"></ng-container>
    <li
      class="ant-menu-overflow-item ant-menu-overflow-item-rest ant-menu-submenu ant-menu-submenu-horizontal"
      nzOverflowRestOutlet
    >
      <div class="ant-menu-submenu-title">...</div>
    </li>
  `,
  providers: [PrefixProvide('ant-menu', true), { provide: NzMenu, useExisting: NzNextMenuComponent }],
  host: {
    '[class]': 'classList'
  }
})
export class NzNextMenuComponent extends NzOverflowContainerDirective implements OnInit, AfterViewInit {
  @ContentChildren(NzMenuItem, { descendants: true }) items!: QueryList<NzMenuItem>;
  @ContentChildren(NzMenuItemTemplate) itemTemplates!: QueryList<NzMenuItemTemplate>;
  directDescendantItems = new QueryList<NzMenuItem>();
  @Input('nzInlineIndent') inlineIndent = 24;
  @Input() nzTheme: NzMenuThemeType = 'light';
  @Input() nzMode: NzMenuModeType = 'vertical';
  @Input() @InputBoolean() nzInlineCollapsed = false;
  @Input('class')
  set menuClass(classes: string) {
    const previousPanelClass = this.previousPanelClass;

    if (previousPanelClass && previousPanelClass.length) {
      previousPanelClass.split(' ').forEach((className: string) => {
        this.classList[className] = false;
      });
    }

    this.previousPanelClass = classes;

    if (classes && classes.length) {
      classes.split(' ').forEach((className: string) => {
        this.classList[className] = true;
      });

      this.elementRef.nativeElement.className = '';
    }
    this.setClassList();
  }

  classList: Record<string, boolean> = {};
  private previousPanelClass: string = '';
  constructor(
    @Inject(ANTD_PREFIX) public readonly prefix: string,
    @Optional() private directionality: Directionality,
    protected nzResizeObserver: NzResizeObserver,
    protected elementRef: ElementRef<HTMLElement>,
    protected cdr: ChangeDetectorRef,
    private destroyService: NzDestroyService
  ) {
    super(nzResizeObserver, elementRef, cdr);
    this.setClassList();
    this.subscribeDirChange();
  }

  ngOnInit(): void {
    console.log(this.itemTemplates);
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    console.log(this.itemTemplates);
    console.log(this.items);
    this.subscribeDirectDescendants();
    super.ngAfterContentInit();
  }

  private subscribeDirChange(): void {
    this.directionality.change.pipe(takeUntil(this.destroyService)).subscribe(() => this.setClassList());
  }

  private subscribeDirectDescendants(): void {
    this.items.changes.pipe(startWith(this.items)).subscribe((items: QueryList<NzMenuItem>) => {
      const directDescendantItems = items.filter(item => item.parentMenu === this);
      console.log(directDescendantItems);
      this.directDescendantItems.reset(directDescendantItems);
      this.directDescendantItems.notifyOnChanges();
    });
  }

  private setClassList(): void {
    const prefix = this.prefix;
    const actualMode = this.nzMode === 'inline' && this.nzInlineCollapsed ? 'vertical' : this.nzMode;
    const classList = {
      [`${prefix}`]: true,
      [`${prefix}-root`]: true,
      [`${prefix}-rtl`]: this.directionality.value === 'rtl',
      [`${prefix}-light`]: this.nzTheme === 'light',
      [`${prefix}-dark`]: this.nzTheme === 'dark',
      [`${prefix}-vertical`]: actualMode === 'vertical',
      [`${prefix}-horizontal`]: actualMode === 'horizontal',
      [`${prefix}-overflow`]: actualMode === 'horizontal',
      [`${prefix}-inline`]: actualMode === 'inline',
      [`${prefix}-inline-collapsed`]: this.nzInlineCollapsed
    };
    Object.assign(this.classList, classList);
    this.cdr.markForCheck();
  }
}
