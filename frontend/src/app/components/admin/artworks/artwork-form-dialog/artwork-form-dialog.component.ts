import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ArtworkService } from '../../../../services/artwork.service';
import { BodyService } from '../../../../services/body.service';
import { UploadService } from '../../../../services/upload.service';
import { Artwork, CreateArtworkRequest } from '../../../../models/artwork.model';
import { Body } from '../../../../models/body.model';

@Component({
  selector: 'app-artwork-form-dialog',
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
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './artwork-form-dialog.component.html',
  styleUrl: './artwork-form-dialog.component.scss'
})
export class ArtworkFormDialogComponent implements OnInit {
  form: CreateArtworkRequest = {
    title: '',
    description: '',
    imageUrl: '',
    year: undefined,
    medium: '',
    dimensions: '',
    bodyId: '',
    order: 1,
    published: false
  };
  
  bodies: Body[] = [];
  loading = false;
  uploading = false;
  error = '';
  isEditMode = false;
  imagePreview = '';

  constructor(
    private artworkService: ArtworkService,
    private bodyService: BodyService,
    private uploadService: UploadService,
    private dialogRef: MatDialogRef<ArtworkFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Artwork | null
  ) {}

  ngOnInit(): void {
    this.loadBodies();
    
    if (this.data) {
      this.isEditMode = true;
      this.form = {
        title: this.data.title,
        description: this.data.description,
        imageUrl: this.data.imageUrl,
        year: this.data.year,
        medium: this.data.medium,
        dimensions: this.data.dimensions,
        bodyId: typeof this.data.bodyId === 'string' ? this.data.bodyId : this.data.bodyId._id,
        order: this.data.order,
        published: this.data.published
      };
      this.imagePreview = this.data.imageUrl;
    }
  }

  loadBodies(): void {
    this.bodyService.getAll().subscribe({
      next: (data) => {
        this.bodies = data;
      },
      error: (err) => {
        console.error('Error loading bodies:', err);
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Show preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);

      // Upload file
      this.uploading = true;
      this.error = '';
      
      this.uploadService.uploadImage(file).subscribe({
        next: (response: any) => {
          this.form.imageUrl = response.url;
          this.uploading = false;
        },
        error: (err) => {
          console.error('Upload error:', err);
          this.error = 'Failed to upload image';
          this.uploading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (!this.form.title.trim()) {
      this.error = 'Title is required';
      return;
    }

    if (!this.form.bodyId) {
      this.error = 'Body of Work is required';
      return;
    }

    if (!this.form.imageUrl.trim()) {
      this.error = 'Image is required';
      return;
    }

    this.loading = true;
    this.error = '';

    const request = this.isEditMode 
      ? this.artworkService.update(this.data!._id, this.form)
      : this.artworkService.create(this.form);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = this.isEditMode ? 'Failed to update artwork' : 'Failed to create artwork';
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}