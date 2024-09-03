import { Location, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, UntypedFormArray, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from '../../../shared/form/form-utils.service';

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
export class CourseFormComponent implements OnInit {
  protected form!: FormGroup;

  constructor(
    protected formBuilder: NonNullableFormBuilder,
    protected serviceCourse: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    protected formUtils: FormUtilsService
  ) { }

  ngOnInit() {
    const COURSE: Course = this.activatedRoute.snapshot.data['course'];

    if (COURSE) {
      this.form = this.formBuilder.group({
        _id: [COURSE._id],
        name: [COURSE.name, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        category: [COURSE.category, [Validators.required]],
        lessons: this.formBuilder.array(this.retrieveLessons(COURSE), [Validators.required])
      });
    }
  }

  private retrieveLessons(course: Course) {
    const LESSONS = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => {
        LESSONS.push(this.createLesson(lesson));
      });
    } else {
      LESSONS.push(this.createLesson());
    }
    return LESSONS;
  }

  private createLesson(lesson: Lesson = {id: '', name: '', youtubeUrl: ''}) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required, Validators.minLength(10), Validators.maxLength(11)]]
    });
  }

  protected removeLesson(index: number) {
    const LESSONS = this.form.get('lessons') as UntypedFormArray;
    LESSONS.removeAt(index);
  }

  protected addNewLesson() {
    const LESSONS = this.form.get('lessons') as UntypedFormArray;
    LESSONS.push(this.createLesson());
  }

  protected getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  protected onSubmit() {
    if (this.form.valid) {
      this.serviceCourse.saveCourse(this.form.value).subscribe({
        next: (data: Course) => this.onSuccess(data),
        error: () => this.onError(),
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
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
}
