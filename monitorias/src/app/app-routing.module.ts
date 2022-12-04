import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssistantComponent } from './assistant/assistant.component';

const routes: Routes = [
  {
    path: 'classRoom',
    loadChildren: () => import('./class-rooms/class-rooms.module').then(m => m.ClassRoomModule)
  },
  {
    path: 'assistant',
    component: AssistantComponent
  },
  {
    path: '**',
    loadChildren: () => import('./class-rooms/class-rooms.module').then(m => m.ClassRoomModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
