import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Body, CreateBodyRequest } from '../models/body.model';

@Injectable({
  providedIn: 'root'
})
export class BodyService {
  private apiUrl = `${environment.apiUrl}/bodies`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Body[]> {
    return this.http.get<Body[]>(this.apiUrl);
  }

  getAllAdmin(): Observable<Body[]> {
    return this.http.get<Body[]>(`${this.apiUrl}/admin`);
  }

  getOne(id: string): Observable<Body> {
    return this.http.get<Body>(`${this.apiUrl}/${id}`);
  }

  create(body: CreateBodyRequest): Observable<Body> {
    return this.http.post<Body>(this.apiUrl, body);
  }

  update(id: string, body: Partial<CreateBodyRequest>): Observable<Body> {
    return this.http.patch<Body>(`${this.apiUrl}/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
