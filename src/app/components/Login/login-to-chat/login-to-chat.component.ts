import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/loginService/AuthService.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserResponse } from '../../../models/UserResponse ';

@Component({
  selector: 'app-login-to-chat',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule], // Incluye HttpClientModule aquí
  templateUrl: './login-to-chat.component.html',
  styleUrls: ['./login-to-chat.component.css']
})
export class LoginToChatComponent {
  usuario: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.usuario, this.password).subscribe({
      next: (response: UserResponse) => {
        console.log('Login successful:', response);
        // Aquí puedes redirigir a la página de chat usando los valores obtenidos
        this.router.navigate([`chat/${response.userId}`]); // Ajusta el URL según tus necesidades
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
