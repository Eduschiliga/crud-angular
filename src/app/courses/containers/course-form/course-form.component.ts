import { Location, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,

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
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      category: ["", [Validators.required]],
    });

    const course: Course = this.activatedRoute.snapshot.data['course'];
    console.log("Teste")
    console.log(course)
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
    const FIELD = this.form.get(fieldName);

    if (FIELD?.hasError('required')) {
      return 'This field is required';
    }

    if (FIELD?.hasError('minlength')) {
      const REQUIRED_LENGTH = FIELD?.errors ? FIELD?.errors['minlength']['requiredLength'] : 3;
      return `Minimum length is ${REQUIRED_LENGTH} characters`;
    }

    if (FIELD?.hasError('maxlength')) {
      const REQUIRED_LENGTH = FIELD?.errors ? FIELD?.errors['maxlength']['requiredLength'] : 3;
      return `Max length is ${REQUIRED_LENGTH} characters`;
    }

    return 'Check the field';
  }
}
