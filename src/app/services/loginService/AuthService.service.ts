import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserResponse } from '../../models/UserResponse ';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    const body = new HttpParams()
      .set('usuario', email)
      .set('password', password);

    return this.http.post<UserResponse>(this.apiUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).pipe(
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
