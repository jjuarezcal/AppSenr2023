import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrganizadoresdetailPage } from './organizadoresdetail.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizadoresdetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrganizadoresdetailPage]
})
export class OrganizadoresdetailPageModule {}
