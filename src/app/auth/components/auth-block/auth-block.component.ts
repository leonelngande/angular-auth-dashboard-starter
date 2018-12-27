import { Component } from '@angular/core';

@Component({
  selector: 'xc-auth-block',
  styleUrls: ['./auth-block.component.scss'],
  template: `
    <ng-content></ng-content>
  `,
})
export class AuthBlockComponent {
}
