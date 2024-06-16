import {Component, Input} from '@angular/core';
import {CategoryPipe} from "../../shared/pipes/category.pipe";
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
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {Course} from "../model/course";
import {ActivatedRoute, Router} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";

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
    MatToolbar
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  protected readonly displayedColumns: string[] = ['_id', 'name', 'category', 'actions'];


  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
  ) {
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
