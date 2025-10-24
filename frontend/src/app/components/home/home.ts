import { Component, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild('hero') heroElement!: ElementRef;
  parallaxOffset = 0;

  ngOnInit(): void {
    this.updateParallax();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.updateParallax();
  }

  private updateParallax(): void {
    const scrollPosition = window.scrollY;
    this.parallaxOffset = scrollPosition * 0.5;

    if (this.heroElement && this.heroElement.nativeElement) {
      this.heroElement.nativeElement.style.backgroundPosition = `center ${-this.parallaxOffset}px`;
    }
  }
}
