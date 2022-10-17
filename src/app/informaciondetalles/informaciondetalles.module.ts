import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InformaciondetallesPage } from './informaciondetalles.page';

const routes: Routes = [
  {
    path: '',
    component: InformaciondetallesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InformaciondetallesPage]
})
export class InformaciondetallesPageModule {}
