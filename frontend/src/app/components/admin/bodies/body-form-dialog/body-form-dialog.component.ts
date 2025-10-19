import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { BodyService } from '../../../../services/body.service';
import { Body, CreateBodyRequest } from '../../../../models/body.model';

@Component({
  selector: 'app-body-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './body-form-dialog.component.html',
  styleUrl: './body-form-dialog.component.scss'
})
export class BodyFormDialogComponent implements OnInit {
  form: CreateBodyRequest = {
    title: '',
    description: '',
    year: undefined,
    coverImage: undefined,
    order: 1,
    published: false
  };
  
  loading = false;
  error = '';
  isEditMode = false;

  constructor(
    private bodyService: BodyService,
    private dialogRef: MatDialogRef<BodyFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Body | null
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.form = {
        title: this.data.title,
        description: this.data.description,
        year: this.data.year,
        coverImage: this.data.coverImage,
        order: this.data.order,
        published: this.data.published
      };
    }
  }

  onSubmit(): void {
    if (!this.form.title.trim()) {
      this.error = 'Title is required';
      return;
    }

    this.loading = true;
    this.error = '';

    const request = this.isEditMode 
      ? this.bodyService.update(this.data!._id, this.form)
      : this.bodyService.create(this.form);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = this.isEditMode ? 'Failed to update body' : 'Failed to create body';
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}