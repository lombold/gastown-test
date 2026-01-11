import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // Private writable signals
  private _currentUser = signal<User | null>(null);
  private _isLoading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Public read-only signals
  readonly currentUser = this._currentUser.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed signals
  readonly isAuthenticated = computed(() => this._currentUser() !== null);
  readonly userName = computed(() => this._currentUser()?.name ?? 'Guest');

  /**
   * Sets the current user
   */
  setUser(user: User | null): void {
    this._currentUser.set(user);
    this._error.set(null);
  }

  /**
   * Logs out the current user
   */
  logout(): void {
    this._currentUser.set(null);
    this._error.set(null);
  }

  /**
   * Sets loading state
   */
  setLoading(loading: boolean): void {
    this._isLoading.set(loading);
  }

  /**
   * Sets error message
   */
  setError(error: string | null): void {
    this._error.set(error);
  }

  /**
   * Clears error message
   */
  clearError(): void {
    this._error.set(null);
  }

  /**
   * Example: Simulates user login
   */
  async simulateLogin(email: string): Promise<void> {
    this.setLoading(true);
    this.clearError();

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data
      const user: User = {
        id: 1,
        name: email.split('@')[0],
        email: email
      };

      this.setUser(user);
    } catch (error) {
      this.setError('Login failed. Please try again.');
    } finally {
      this.setLoading(false);
    }
  }
}
