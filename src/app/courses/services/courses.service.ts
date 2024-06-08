import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Course} from "../model/course";
import {first, Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})

export class CoursesService {
  private readonly API = "/assets/courses.json";

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API).pipe(
      first(),
      tap((courses: Course[]) => {
        console.log(courses);
      })
    );
  }
}
