import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Artwork {
  _id: string;
  title: string;
  imageUrl?: string;
  year?: number;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  featuredWorks: Artwork[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize with 8 empty placeholder artworks
    this.featuredWorks = Array.from({ length: 8 }, (_, i) => ({
      _id: `placeholder-${i}`,
      title: `Artwork ${i + 1}`,
      year: undefined,
      imageUrl: undefined
    }));
  }

  viewArtwork(id: string): void {
    // Only navigate if it's a real artwork (not a placeholder)
    if (!id.startsWith('placeholder-')) {
      this.router.navigate(['/artwork', id]);
    }
  }
}
