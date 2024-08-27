import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';


import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    CategoryPipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTable,
    MatMiniFabButton,
    MatHeaderCellDef,
    MatToolbar,
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Output() addCourse = new EventEmitter(false);
  @Output() editCourse = new EventEmitter(false);
  @Output() removeCourse = new EventEmitter(false);
  protected readonly displayedColumns: string[] = ['_id', 'name', 'category', 'actions'];

  constructor() { }

  onAdd() {
    this.addCourse.emit(true);
  }

  onEdit(course: Course) {
    this.editCourse.emit(course);
  }

  onDelete(course: Course) {
    this.removeCourse.emit(course);
  }
}
