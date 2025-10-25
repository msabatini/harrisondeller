import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BodyService } from '../../services/body.service';
import { ArtworkService } from '../../services/artwork.service';
import { Body } from '../../models/body.model';
import { Artwork } from '../../models/artwork.model';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class GalleryComponent implements OnInit {
  @ViewChild('heroImage') heroImage!: ElementRef;
  bodies: Body[] = [];
  selectedBody: Body | null = null;
  artworks: Artwork[] = [];
  loading = false;
  parallaxOffset = 0;
  viewMode: 'list' | 'grid' = 'list'; // Default to list view

  constructor(
    private bodyService: BodyService,
    private artworkService: ArtworkService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBodies();
    this.updateParallax();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.updateParallax();
  }

  private updateParallax(): void {
    const scrollPosition = window.scrollY;
    this.parallaxOffset = scrollPosition * 0.5;

    if (this.heroImage && this.heroImage.nativeElement) {
      this.heroImage.nativeElement.style.transform = `translateY(${this.parallaxOffset}px)`;
    }
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

  viewArtwork(artworkId: string): void {
    this.router.navigate(['/gallery/artwork', artworkId]);
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
  }
}
