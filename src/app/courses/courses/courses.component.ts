import {Component} from '@angular/core';
import {AppMaterialModule} from "../../shared/app-material/app-material.module";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {catchError, Observable, of} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../shared/components/error-dialog/error-dialog.component";
import {CategoryPipe} from "../../shared/pipes/category.pipe";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    AppMaterialModule,
    AsyncPipe,
    NgIf,
    CategoryPipe,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export class CoursesComponent {
  courses$: Observable<Course[]>;
  displayedColumns: string[] = ['_id', 'name', 'category', 'actions'];

  constructor(
    protected coursesService: CoursesService,
    protected dialog: MatDialog,
    protected router: Router,
    protected route: ActivatedRoute,
  ) {
    this.courses$ = coursesService.findAll().pipe(
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
}
