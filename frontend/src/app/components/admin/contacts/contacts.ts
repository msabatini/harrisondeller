import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContactService } from '../../../services/contact.service';
import { Contact } from '../../../models/contact.model';
import { ContactDetailDialogComponent } from './contact-detail-dialog/contact-detail-dialog.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss'
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  displayedColumns: string[] = ['name', 'email', 'subject', 'read', 'date', 'actions'];
  loading = false;
  error = '';

  constructor(
    private contactService: ContactService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.loading = true;
    this.error = '';
    
    this.contactService.getAll().subscribe({
      next: (data) => {
        // Sort by newest first
        this.contacts = data.sort((a, b) => 
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading contacts:', err);
        this.error = 'Failed to load contacts';
        this.loading = false;
      }
    });
  }

  openDetailDialog(contact: Contact): void {
    const dialogRef = this.dialog.open(ContactDetailDialogComponent, {
      width: '700px',
      data: contact
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadContacts();
      }
    });
  }

  deleteContact(id: string): void {
    if (confirm('Are you sure you want to delete this contact submission?')) {
      this.contactService.delete(id).subscribe({
        next: () => {
          this.loadContacts();
        },
        error: (err) => {
          console.error('Error deleting contact:', err);
          this.error = 'Failed to delete contact';
        }
      });
    }
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getUnreadCount(): number {
    return this.contacts.filter(c => !c.read).length;
  }
}
