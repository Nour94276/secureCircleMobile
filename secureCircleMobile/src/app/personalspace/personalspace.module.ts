import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalspacePageRoutingModule } from './personalspace-routing.module';

import { PersonalspacePage } from './personalspace.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalspacePageRoutingModule
  ],
  declarations: [PersonalspacePage]
})
export class PersonalspacePageModule {}
