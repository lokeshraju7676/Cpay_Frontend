import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']  
})
export class RegisterComponent {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,  // Fixed name to match the actual service name
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
      console.log('Form Data:', registerData); // Debug log

      // Call the signup service method
      this.authService.signup(registerData).subscribe({
        next: (response: any) => {
          console.log('Registration successful', response);

          // Store token (if applicable)
          if (response.token) {
            localStorage.setItem('token', response.token);
          }

          // Display success message
          alert('Registration successful!');

          // Reset form after successful registration
          this.registerForm.reset();

          // Redirect to home page with error handling for navigation
          this.router.navigate(['/home']).catch((err: any) => {
            console.error('Error navigating to home:', err);
            alert('Failed to redirect to home.');
          });
        },
        error: (error: any) => {
          console.error('Registration failed', error);

          // Show error message if any
          alert('Registration failed: ' + (error.error?.message || 'Unknown error occurred.'));
        }
      });
    } else {
      alert('Please ensure the form is valid.');
    }
  }
}
