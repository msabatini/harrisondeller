import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../../../services/contact.service';
import { Contact } from '../../../../models/contact.model';

@Component({
  selector: 'app-contact-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './contact-detail-dialog.component.html',
  styleUrl: './contact-detail-dialog.component.scss'
})
export class ContactDetailDialogComponent implements OnInit {
  loading = false;
  error = '';
  replyMessage = '';
  replySending = false;

  constructor(
    private contactService: ContactService,
    private dialogRef: MatDialogRef<ContactDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public contact: Contact
  ) {}

  ngOnInit(): void {
    if (!this.contact.read) {
      this.markAsRead();
    }
  }

  markAsRead(): void {
    this.contactService.markAsRead(this.contact._id).subscribe({
      next: (updated) => {
        this.contact.read = true;
      },
      error: (err) => {
        console.error('Error marking as read:', err);
      }
    });
  }

  sendReply(): void {
    if (!this.replyMessage.trim()) {
      this.error = 'Reply message cannot be empty';
      return;
    }

    this.replySending = true;
    this.error = '';

    // In a real app, you'd have a backend endpoint for this
    // For now, we'll just show success message
    setTimeout(() => {
      this.replySending = false;
      // Show success - in real app, send email via backend
      alert('Reply would be sent to: ' + this.contact.email);
      this.replyMessage = '';
    }, 1500);
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString() + ' at ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  onClose(): void {
    this.dialogRef.close(true);
  }

  copyEmail(): void {
    navigator.clipboard.writeText(this.contact.email);
    alert('Email copied to clipboard');
  }
}