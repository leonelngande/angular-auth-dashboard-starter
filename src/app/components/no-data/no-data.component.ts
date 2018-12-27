import {Component, Input} from '@angular/core';

@Component({
  selector: 'xc-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
})
export class NoDataComponent {

  @Input() dataType = 'resource';
  @Input() textOnly = false;

  constructor() { }

}
