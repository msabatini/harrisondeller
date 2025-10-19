import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { CreateContactRequest } from '../../models/contact.model';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  formData: CreateContactRequest = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  submitted = false;
  loading = false;
  error = '';

  constructor(private contactService: ContactService) {}

  onSubmit(): void {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      this.error = 'Please fill in all required fields';
      return;
    }

    this.loading = true;
    this.error = '';

    this.contactService.submit(this.formData).subscribe({
      next: () => {
        this.submitted = true;
        this.loading = false;
        this.resetForm();
      },
      error: (error) => {
        console.error('Error submitting contact form:', error);
        this.error = 'Failed to send message. Please try again.';
        this.loading = false;
      }
    });
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
