import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonLoaderComponent } from './skeleton-loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';



@NgModule({
  declarations: [
    SkeletonLoaderComponent
  ],
  imports: [
    CommonModule,NgxSkeletonLoaderModule.forRoot()
  ],
  exports:[
    SkeletonLoaderComponent
  ]
})
export class SkeletonLoaderModule { }
