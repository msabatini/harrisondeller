import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BodyService } from '../../../services/body.service';
import { Body } from '../../../models/body.model';
import { BodyFormDialogComponent } from './body-form-dialog/body-form-dialog.component';

@Component({
  selector: 'app-bodies',
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
  templateUrl: './bodies.html',
  styleUrl: './bodies.scss'
})
export class BodiesComponent implements OnInit {
  bodies: Body[] = [];
  displayedColumns: string[] = ['title', 'year', 'published', 'order', 'actions'];
  loading = false;
  error = '';

  constructor(
    private bodyService: BodyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBodies();
  }

  loadBodies(): void {
    this.loading = true;
    this.error = '';
    
    this.bodyService.getAllAdmin().subscribe({
      next: (data) => {
        this.bodies = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading bodies:', err);
        this.error = 'Failed to load bodies of work';
        this.loading = false;
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(BodyFormDialogComponent, {
      width: '600px',
      data: null,
      panelClass: 'body-form-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBodies();
      }
    });
  }

  openEditDialog(body: Body): void {
    const dialogRef = this.dialog.open(BodyFormDialogComponent, {
      width: '600px',
      data: body,
      panelClass: 'body-form-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadBodies();
      }
    });
  }

  deleteBody(id: string): void {
    if (confirm('Are you sure you want to delete this body of work?')) {
      this.bodyService.delete(id).subscribe({
        next: () => {
          this.loadBodies();
        },
        error: (err) => {
          console.error('Error deleting body:', err);
          this.error = 'Failed to delete body of work';
        }
      });
    }
  }
}
