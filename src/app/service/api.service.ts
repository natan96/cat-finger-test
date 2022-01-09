import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICat } from '../interface/icat';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://cataas.com';

  constructor(private http: HttpClient) {}

  getTags() {
    return this.http.get<string[]>(`${this.url}/api/tags`);
  }

  getCats(tags: string[], limit: number) {
    let endpoint = `${this.url}/api/cats?`;
    if (tags?.length) {
      tags.forEach((tag, i) => {
        endpoint = `${endpoint}${tag}${i < tags.length -1 ? ',' : '&'}`;
      });
    }
    endpoint = `${endpoint}skip=0&limit=${limit}`;
    return this.http.get<ICat[]>(endpoint);
  }
}