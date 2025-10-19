import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ArtworkService } from '../../../services/artwork.service';
import { Artwork } from '../../../models/artwork.model';
import { ArtworkFormDialogComponent } from './artwork-form-dialog/artwork-form-dialog.component';

@Component({
  selector: 'app-artworks',
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
  templateUrl: './artworks.html',
  styleUrl: './artworks.scss'
})
export class ArtworksComponent implements OnInit {
  artworks: Artwork[] = [];
  displayedColumns: string[] = ['title', 'bodyId', 'year', 'published', 'order', 'actions'];
  loading = false;
  error = '';

  constructor(
    private artworkService: ArtworkService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadArtworks();
  }

  loadArtworks(): void {
    this.loading = true;
    this.error = '';
    
    this.artworkService.getAllAdmin().subscribe({
      next: (data) => {
        this.artworks = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading artworks:', err);
        this.error = 'Failed to load artworks';
        this.loading = false;
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ArtworkFormDialogComponent, {
      width: '700px',
      data: null,
      panelClass: 'artwork-form-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadArtworks();
      }
    });
  }

  openEditDialog(artwork: Artwork): void {
    const dialogRef = this.dialog.open(ArtworkFormDialogComponent, {
      width: '700px',
      data: artwork,
      panelClass: 'artwork-form-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadArtworks();
      }
    });
  }

  deleteArtwork(id: string): void {
    if (confirm('Are you sure you want to delete this artwork?')) {
      this.artworkService.delete(id).subscribe({
        next: () => {
          this.loadArtworks();
        },
        error: (err) => {
          console.error('Error deleting artwork:', err);
          this.error = 'Failed to delete artwork';
        }
      });
    }
  }

  getBodyName(bodyId: any): string {
    if (!bodyId) return 'Unknown';
    return typeof bodyId === 'string' ? bodyId : bodyId.title || bodyId._id;
  }
}
