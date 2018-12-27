import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { KittenComponent } from './kitten/kitten.component';
import {DashboardComponent} from './dashboard.component';


@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    DashboardComponent,
    KittenComponent,
  ],
})
export class DashboardModule { }
