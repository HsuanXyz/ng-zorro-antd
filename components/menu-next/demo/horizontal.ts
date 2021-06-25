import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-menu-next-horizontal',
  template: `
    <nz-nav-menu>
      <ng-container *nzMenuNextItem>Navigation One</ng-container>
      <ng-container *nzMenuNextItem>Navigation Two</ng-container>
      <ng-container *nzMenuNextItem>Navigation Three</ng-container>
      <ng-container *nzMenuNextItem> Navigation Four</ng-container>
    </nz-nav-menu>
  `
})
export class NzDemoMenuNextHorizontalComponent {}
