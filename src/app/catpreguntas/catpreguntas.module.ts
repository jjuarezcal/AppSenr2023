import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CatpreguntasPage } from './catpreguntas.page';

const routes: Routes = [
  {
    path: '',
    component: CatpreguntasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CatpreguntasPage]
})
export class CatpreguntasPageModule {}
