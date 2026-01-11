import { Injectable, inject, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);
  private platformId = inject(PLATFORM_ID);

  private readonly API_URL = 'https://jsonplaceholder.typicode.com';

  /**
   * Fetches items from the API with SSR state transfer support.
   * Prevents duplicate API calls between server and client by using TransferState.
   */
  async getItems(): Promise<any[]> {
    const key = makeStateKey<any[]>('items');

    // Check if data exists in transfer state (from SSR)
    if (this.transferState.hasKey(key)) {
      const data = this.transferState.get(key, []);
      this.transferState.remove(key);
      return data;
    }

    // Fetch data from API
    const data = await firstValueFrom(
      this.http.get<any[]>(`${this.API_URL}/posts?_limit=5`)
    );

    // Store in transfer state if on server
    if (!isPlatformBrowser(this.platformId)) {
      this.transferState.set(key, data);
    }

    return data;
  }

  /**
   * Fetches a single item by ID with SSR state transfer support.
   */
  async getItem(id: number): Promise<any> {
    const key = makeStateKey<any>(`item-${id}`);

    // Check transfer state
    if (this.transferState.hasKey(key)) {
      const data = this.transferState.get(key, null);
      this.transferState.remove(key);
      return data;
    }

    // Fetch data
    const data = await firstValueFrom(
      this.http.get<any>(`${this.API_URL}/posts/${id}`)
    );

    // Store in transfer state if on server
    if (!isPlatformBrowser(this.platformId)) {
      this.transferState.set(key, data);
    }

    return data;
  }
}
