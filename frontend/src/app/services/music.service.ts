import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Music, CreateMusicRequest } from '../models/music.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private apiUrl = `${environment.apiUrl}/music`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Music[]> {
    return this.http.get<Music[]>(this.apiUrl);
  }

  getAllAdmin(): Observable<Music[]> {
    return this.http.get<Music[]>(`${this.apiUrl}/admin`);
  }

  getOne(id: string): Observable<Music> {
    return this.http.get<Music>(`${this.apiUrl}/${id}`);
  }

  create(music: CreateMusicRequest): Observable<Music> {
    return this.http.post<Music>(this.apiUrl, music);
  }

  update(id: string, music: Partial<CreateMusicRequest>): Observable<Music> {
    return this.http.patch<Music>(`${this.apiUrl}/${id}`, music);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
