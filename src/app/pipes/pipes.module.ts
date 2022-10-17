import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarPipe } from './avatar.pipe';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AvatarPipe, TruncatePipe],
  exports: [AvatarPipe]
})
export class AppPipesModule { }
