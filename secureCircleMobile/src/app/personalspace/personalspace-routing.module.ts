import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalspacePage } from './personalspace.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalspacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalspacePageRoutingModule {}
