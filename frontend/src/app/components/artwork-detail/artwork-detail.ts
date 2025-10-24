import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ArtworkService } from '../../services/artwork.service';
import { BodyService } from '../../services/body.service';
import { Artwork } from '../../models/artwork.model';
import { Body } from '../../models/body.model';

@Component({
  selector: 'app-artwork-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './artwork-detail.html',
  styleUrl: './artwork-detail.scss'
})
export class ArtworkDetailComponent implements OnInit {
  artwork: Artwork | null = null;
  body: Body | null = null;
  loading = true;
  error: string | null = null;
  relatedArtworks: Artwork[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artworkService: ArtworkService,
    private bodyService: BodyService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const artworkId = params['id'];
      if (artworkId) {
        this.loadArtwork(artworkId);
      }
    });
  }

  loadArtwork(id: string): void {
    this.loading = true;
    this.error = null;
    
    this.artworkService.getOne(id).subscribe({
      next: (artwork) => {
        this.artwork = artwork;
        if (artwork.bodyId) {
          this.loadBodyInfo(artwork.bodyId._id || artwork.bodyId);
          this.loadRelatedArtworks(artwork.bodyId._id || artwork.bodyId, id);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading artwork:', error);
        this.error = 'Could not load artwork. Please try again.';
        this.loading = false;
      }
    });
  }

  loadBodyInfo(bodyId: string): void {
    this.bodyService.getOne(bodyId).subscribe({
      next: (body) => {
        this.body = body;
      },
      error: (error) => {
        console.error('Error loading body:', error);
      }
    });
  }

  loadRelatedArtworks(bodyId: string, excludeId: string): void {
    this.artworkService.getAll(bodyId).subscribe({
      next: (artworks) => {
        this.relatedArtworks = artworks.filter(a => a._id !== excludeId).slice(0, 4);
      },
      error: (error) => {
        console.error('Error loading related artworks:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/gallery']);
  }

  navigateToArtwork(artworkId: string): void {
    this.router.navigate(['/gallery/artwork', artworkId]);
  }
}