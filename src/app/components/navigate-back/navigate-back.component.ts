import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'xc-navigate-back',
  templateUrl: './navigate-back.component.html',
  styleUrls: ['./navigate-back.component.scss'],
})

export class NavigateBackComponent implements OnInit {

  @Input() route: string;
  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    if (this.route) {
      this.router.navigateByUrl(this.route);
    } else {
      this.location.back();
    }
  }

}
