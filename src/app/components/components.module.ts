import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThemeModule} from '../@theme/theme.module';
import { NavigateBackComponent } from './navigate-back/navigate-back.component';
import {NoDataComponent} from './no-data/no-data.component';
import {OutletLayoutComponent} from './outlet-layout/outlet-layout.component';
import {NebularModule} from '../nebular.module';

const COMPONENTS = [
  NavigateBackComponent,
  NoDataComponent,
  OutletLayoutComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NebularModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, ThemeModule, CommonModule, NebularModule],
})

export class ComponentsModule { }
