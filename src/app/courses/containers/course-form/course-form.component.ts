import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {CoursesService} from "../../services/courses.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location, NgIf} from "@angular/common";
import {Course} from "../../model/course";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SharedModule,
    NgIf
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {
  form: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    protected serviceCourse: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      _id: [""],
      name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      category: ["", [Validators.required]],
    });

    const course: Course = this.activatedRoute.snapshot.data['course'];
    if (course) {
      console.log(course)
      this.form.setValue({
        _id: course._id,
        name: course.name,
        category: course.category
      });
    }
  }

  onSubmit() {
    this.serviceCourse.saveCourse(this.form.value).subscribe(data => {
      this.onSuccess(data);
    }, error => {
      this.onError();
    });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess(data: Course) {
    this._snackBar.open(`Course ${data.name} saved successfully!`, '', {
      duration: 5000,
      panelClass: ['success-snackbar']
    });
    this.onCancel();
  }

  private onError() {
    this._snackBar.open("Error saving course!", '', {duration: 5000, panelClass: ['error-snackbar']});
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    return field?.hasError('required') ? 'This field is required' :
      field?.hasError('minlength') ? 'Minimum length is 5 characters' :
        field?.hasError('maxlength') ? 'Maximum length is 100 characters' :
          '';
  }
}
