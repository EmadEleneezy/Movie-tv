
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly apiKey = '68e1a1fca65f3053810b5d780ee81c19';

  constructor(private _HttpClient: HttpClient) {}

  getItemDetails(id: string, mediaType: string): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}/${mediaType}/${id}?api_key=${this.apiKey}&language=en-US`
    );
  }

  getSimilar(id: string, mediaType: string): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}/${mediaType}/${id}/similar?api_key=${this.apiKey}&language=en-US&page=1`
    );
  }

  getTrending(mediaType: string): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}/trending/${mediaType}/week?api_key=${this.apiKey}`
    );
  }
}
