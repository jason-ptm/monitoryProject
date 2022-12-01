import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistantRoutingModule } from './assistant-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AssistantComponent } from './assistant.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [
    AssistantComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    AssistantRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class AssistantModule { }