import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MusicService } from '../../../services/music.service';
import { Music } from '../../../models/music.model';
import { MusicFormDialogComponent } from './music-form-dialog/music-form-dialog.component';

@Component({
  selector: 'app-music-admin',
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
  templateUrl: './music-admin.html',
  styleUrl: './music-admin.scss'
})
export class MusicAdminComponent implements OnInit {
  musicList: Music[] = [];
  displayedColumns: string[] = ['title', 'artist', 'album', 'releaseYear', 'published', 'order', 'actions'];
  loading = false;
  error = '';

  constructor(
    private musicService: MusicService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMusic();
  }

  loadMusic(): void {
    this.loading = true;
    this.error = '';
    
    this.musicService.getAllAdmin().subscribe({
      next: (data) => {
        this.musicList = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading music:', err);
        this.error = 'Failed to load music';
        this.loading = false;
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(MusicFormDialogComponent, {
      width: '600px',
      data: null,
      panelClass: 'music-form-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMusic();
      }
    });
  }

  openEditDialog(music: Music): void {
    const dialogRef = this.dialog.open(MusicFormDialogComponent, {
      width: '600px',
      data: music,
      panelClass: 'music-form-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMusic();
      }
    });
  }

  deleteMusic(id: string): void {
    if (confirm('Are you sure you want to delete this music?')) {
      this.musicService.delete(id).subscribe({
        next: () => {
          this.loadMusic();
        },
        error: (err) => {
          console.error('Error deleting music:', err);
          this.error = 'Failed to delete music';
        }
      });
    }
  }
}
