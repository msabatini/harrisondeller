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

  getSpotifyEmbedUrl(spotifyUrl: string): SafeResourceUrl {
    const trackId = spotifyUrl.split('/').pop()?.split('?')[0];
    const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
