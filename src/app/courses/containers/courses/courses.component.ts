import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbar } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    CategoryPipe,
    CoursesListComponent,
    MatSpinner,
    MatCard,
    MatToolbar
],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export class CoursesComponent {
  courses$: Observable<Course[]> | undefined;
  displayedColumns: string[] = ['_id', 'name', 'category', 'actions'];

  constructor(
    protected coursesService: CoursesService,
    protected dialog: MatDialog,
    protected router: Router,
    protected route: ActivatedRoute,
    protected snackBar: MatSnackBar,
  ) {
    this.refresh();
  }

  refresh() {
    this.courses$ = this.coursesService.findAll().pipe(
      catchError(() => {
        this.onError("Ops! Error loading courses! Wait a moment");
        return of([]);
      })
    );
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
    });
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], {relativeTo: this.route});
  }

  onRemove(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Are you sure you want to remove this course?",
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.remove(course._id).subscribe(() => {
          this.snackBar.open(`Course removed successfully!`, 'X', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.refresh();
        }, error => this.onError("Error when removing course"))
      }
    });
  }
}
