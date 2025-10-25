import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MusicService } from '../../services/music.service';
import { Music } from '../../models/music.model';

@Component({
  selector: 'app-music',
  imports: [CommonModule],
  templateUrl: './music.html',
  styleUrl: './music.scss'
})
export class MusicComponent implements OnInit {
  musicList: Music[] = [];
  loading = false;

  constructor(
    private musicService: MusicService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadMusic();
  }

  loadMusic(): void {
    this.loading = true;
    this.musicService.getAll().subscribe({
      next: (music) => {
        this.musicList = music;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading music:', error);
        this.loading = false;
      }
    });
  }

  getSpotifyUrl(spotifyUrl: string): string {
    if (!spotifyUrl) {
      return '';
    }

    // If it's already an iframe/embed URL, extract the URL
    if (spotifyUrl.includes('<iframe')) {
      const srcMatch = spotifyUrl.match(/src=["']([^"']+)["']/);
      if (srcMatch && srcMatch[1]) {
        // Extract the base URL without query parameters
        return srcMatch[1].split('?')[0];
      }
    }

    // Otherwise, return the URL as-is (remove query parameters)
    return spotifyUrl.split('?')[0];
  }
}
