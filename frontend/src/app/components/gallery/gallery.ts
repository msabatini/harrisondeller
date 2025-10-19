import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyService } from '../../services/body.service';
import { ArtworkService } from '../../services/artwork.service';
import { Body } from '../../models/body.model';
import { Artwork } from '../../models/artwork.model';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class GalleryComponent implements OnInit {
  bodies: Body[] = [];
  selectedBody: Body | null = null;
  artworks: Artwork[] = [];
  loading = false;

  constructor(
    private bodyService: BodyService,
    private artworkService: ArtworkService
  ) {}

  ngOnInit(): void {
    this.loadBodies();
  }

  loadBodies(): void {
    this.loading = true;
    this.bodyService.getAll().subscribe({
      next: (bodies) => {
        this.bodies = bodies;
        this.loading = false;
        if (bodies.length > 0) {
          this.selectBody(bodies[0]);
        }
      },
      error: (error) => {
        console.error('Error loading bodies:', error);
        this.loading = false;
      }
    });
  }

  selectBody(body: Body): void {
    this.selectedBody = body;
    this.loadArtworks(body._id);
  }

  loadArtworks(bodyId: string): void {
    this.loading = true;
    this.artworkService.getAll(bodyId).subscribe({
      next: (artworks) => {
        this.artworks = artworks;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading artworks:', error);
        this.loading = false;
      }
    });
  }
}
