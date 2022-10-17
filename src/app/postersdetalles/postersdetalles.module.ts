import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PostersdetallesPage } from './postersdetalles.page';

const routes: Routes = [
  {
    path: '',
    component: PostersdetallesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PostersdetallesPage]
})
export class PostersdetallesPageModule {}
