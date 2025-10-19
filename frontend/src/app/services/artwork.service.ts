import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Artwork, CreateArtworkRequest } from '../models/artwork.model';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private apiUrl = `${environment.apiUrl}/artworks`;

  constructor(private http: HttpClient) {}

  getAll(bodyId?: string): Observable<Artwork[]> {
    let params = new HttpParams();
    if (bodyId) {
      params = params.set('bodyId', bodyId);
    }
    return this.http.get<Artwork[]>(this.apiUrl, { params });
  }

  getAllAdmin(): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(`${this.apiUrl}/admin`);
  }

  getOne(id: string): Observable<Artwork> {
    return this.http.get<Artwork>(`${this.apiUrl}/${id}`);
  }

  create(artwork: CreateArtworkRequest): Observable<Artwork> {
    return this.http.post<Artwork>(this.apiUrl, artwork);
  }

  update(id: string, artwork: Partial<CreateArtworkRequest>): Observable<Artwork> {
    return this.http.patch<Artwork>(`${this.apiUrl}/${id}`, artwork);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
