import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'classRoom',
    loadChildren: () => import('./class-rooms/class-rooms.module').then(m => m.ClassRoomModule)
  },
  {
    path: 'assistant',
    loadChildren: () => import('./assistant/assistant.module').then(m => m.AssistantModule)
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
