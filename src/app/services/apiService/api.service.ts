import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private baseUrl = 'https://ui-avatars.com/api/';

  constructor(private http: HttpClient) {}

  getAvatar(name: string) {
    const params = {
      name: name,
      background: '0000AD', // Color de fondo (azul que usas en tu app)
      color: 'fff', // Color del texto (blanco)
      size: '128', // Tamaño del avatar
      bold: 'true',
      format: 'png'
    };

    return `${this.baseUrl}?${this.objectToQueryString(params)}`;
  }

  private objectToQueryString(obj: any): string {
    return Object.keys(obj)
      .map(key => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&');
  }
}
