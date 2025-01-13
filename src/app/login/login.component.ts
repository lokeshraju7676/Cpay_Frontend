import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private creditCardService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log('Login Data:', loginData);

      this.creditCardService.login(loginData).subscribe({
        next: (response: any) => {
          console.log('Login successful', response);
          localStorage.setItem('token', response.token); // Store token in localStorage
          alert('Login successful!');

          // Navigate to home page or dashboard
          this.router.navigate(['/home']).catch(err => {
            console.error('Error navigating to home:', err);
            alert('Failed to redirect to home.');
          });
        },
        error: (error: any) => {
          console.error('Login failed', error);
          alert('Login failed: ' + (error.error?.message || 'Unknown error occurred.'));
        }
      });
    } else {
      alert('Please ensure the form is valid.');
    }
  }
}
