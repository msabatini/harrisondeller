import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MusicService } from '../../../../services/music.service';
import { Music, CreateMusicRequest } from '../../../../models/music.model';

@Component({
  selector: 'app-music-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './music-form-dialog.component.html',
  styleUrl: './music-form-dialog.component.scss'
})
export class MusicFormDialogComponent implements OnInit {
  form: CreateMusicRequest = {
    title: '',
    artist: '',
    album: '',
    spotifyUrl: '',
    audioUrl: '',
    coverImage: '',
    releaseYear: undefined,
    order: 1,
    published: false
  };
  
  loading = false;
  error = '';
  isEditMode = false;

  constructor(
    private musicService: MusicService,
    private dialogRef: MatDialogRef<MusicFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Music | null
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.form = {
        title: this.data.title,
        artist: this.data.artist,
        album: this.data.album,
        spotifyUrl: this.data.spotifyUrl,
        audioUrl: this.data.audioUrl,
        coverImage: this.data.coverImage,
        releaseYear: this.data.releaseYear,
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
      ? this.musicService.update(this.data!._id, this.form)
      : this.musicService.create(this.form);

    request.subscribe({
      next: () => {
        this.loading = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = this.isEditMode ? 'Failed to update music' : 'Failed to create music';
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}