import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Injectable({
  providedIn: 'root'
})

export class CourseResolver implements Resolve<Course> {

  constructor(private service: CoursesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    const id = route.params['id']
    if (route.params && id) {
      return this.service.loadById(id);
    }
    return of({_id: '', name: '', category: '', lessons: []});
  }
}
