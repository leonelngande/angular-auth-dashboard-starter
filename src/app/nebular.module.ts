import { NgModule } from '@angular/core';
import {NbAccordionModule, NbButtonModule, NbListModule, NbRadioModule, NbSpinnerModule} from '@nebular/theme';

const MODULES = [
  NbListModule,
  NbSpinnerModule,
  NbRadioModule,
  NbButtonModule,
  NbAccordionModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
})

export class NebularModule {
}
