import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../admin/admin.service';
import { StudentService } from '../Student/student.service';
import { MarksService } from '../marks/marks.service';
import { TeacherService } from '../teacher/teacher.service';
import baseUrl from '../url';
import { Login } from './Login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  status = false;
  constructor(
    private expeneService: MarksService,
    private router: Router,
    public http: HttpClient,
    public snack: MatSnackBar,
    private studentService: StudentService,
    private adminService: AdminService,
    private teacherService: TeacherService
  ) {}
  public login(login: Login) {
    return this.http.post<Boolean>(`${baseUrl}/login`, login).subscribe(
      (data: boolean) => {
        if (data == true) {
          this.setStatus(true);
          localStorage.setItem('email', login.email);
          localStorage.setItem('email', login.email);
          this.studentService.setStudent(login.email);
        } else {
          this.snack.open('Invalid Credentials', 'OK', {
            duration: 3000,
          });
        }
      },
      (error: HttpErrorResponse) => {
        this.snack.open('User Does Not exist', 'OK', {
          duration: 3000,
        });
      }
    );
  }
  route() {
    let role = localStorage.getItem('role');
    this.router.navigate([role]);
  }
  public setStatus(s: boolean) {
    this.status = s;
  }
  public isLoggedIn() {
    return this.status;
  }
  public logout() {
    localStorage.clear();
    this.status = false;
  }
}
