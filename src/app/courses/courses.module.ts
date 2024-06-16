import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursesRoutingModule} from './courses-routing.module';
import {SharedModule} from "../shared/shared.module";
import {CoursesComponent} from "./containers/courses/courses.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    CoursesComponent,
    ReactiveFormsModule,
  ]
})
export class CoursesModule {
}
