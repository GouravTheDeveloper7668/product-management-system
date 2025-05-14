import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormViewComponent } from './form-view.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FormViewComponent
  ],
  imports: [
          SharedModule,
          RouterModule.forChild([
            {path:'',component:FormViewComponent}
          ]),
          CommonModule,
    ]
})
export class FormViewModule { }
