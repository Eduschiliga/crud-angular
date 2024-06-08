import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursesRoutingModule} from './courses-routing.module';
import {AppMaterialModule} from "../shared/app-material/app-material.module";
import {SharedModule} from "../shared/shared.module";
import {CoursesComponent} from "./courses/courses.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    SharedModule,
    CoursesComponent,
  ]
})
export class CoursesModule {
}
