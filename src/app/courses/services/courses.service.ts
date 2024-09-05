import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Course} from "../model/course";
import {first, Observable} from "rxjs";
import {tap} from "rxjs/operators";
import { CoursePage } from "../model/course-page";

@Injectable({
  providedIn: "root"
})

export class CoursesService {
  private readonly API = "http://localhost:8080/api/courses";

  constructor(private http: HttpClient) {
  }

  public findAll(page = 0, pageSize = 10): Observable<CoursePage> {
    return this.http.get<CoursePage>(this.API, {params: {page, pageSize}}).pipe(
      first(),
    );
  }

  loadById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.API}/${id}`);
  }

  public saveCourse(record: Partial<Course>) {
    if (record._id) {
      return this.update(record);
    }
    return this.create(record);
  }

  remove(id: string) {
    return this.http.delete(`${this.API}/${id}`).pipe(first());
  }

  private create(record: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.API, record).pipe(first());
  }

  private update(record: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${this.API}/${record._id}`, record).pipe(first());
  }

}
