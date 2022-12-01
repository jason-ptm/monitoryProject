import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassRoomRoutingModule } from './class-rooms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';

import { ClassRoomsComponent } from './class-rooms.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    ClassRoomsComponent,
    AddComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ClassRoomRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule
  ]
})
export class ClassRoomModule { }