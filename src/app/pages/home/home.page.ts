import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/ui/card/card.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { HeaderComponent } from '../../components/ui/header/header.component';
import { ApiService } from '../../core/services/api.service';
import { SeoService } from '../../core/services/seo.service';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, CardComponent, ButtonComponent, HeaderComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage implements OnInit {
  // Smart component - injects services
  private apiService = inject(ApiService);
  private seoService = inject(SeoService);
  private stateService = inject(StateService);

  // Manages state with signals
  items = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Access state service signals
  userName = this.stateService.userName;
  isAuthenticated = this.stateService.isAuthenticated;

  async ngOnInit(): Promise<void> {
    // Set SEO meta tags
    this.seoService.setPageMeta({
      title: 'Home - Gastowntest',
      description: 'Welcome to Gastowntest, an Angular v21 SSR application with Smart/Presentational pattern',
      keywords: 'angular, ssr, typescript, web development'
    });

    // Load data
    await this.loadItems();
  }

  // Business logic
  async loadItems(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const data = await this.apiService.getItems();
      this.items.set(data);
    } catch (err) {
      this.error.set('Failed to load items. Please try again.');
      console.error('Error loading items:', err);
    } finally {
      this.loading.set(false);
    }
  }

  // Event handlers with side effects
  onCardClick(item: any): void {
    console.log('Card clicked:', item);
  }

  onActionClick(item: any): void {
    console.log('Action clicked for item:', item);
  }

  onRefreshClick(): void {
    this.loadItems();
  }

  onLoginClick(): void {
    this.stateService.simulateLogin('user@example.com');
  }

  onLogoutClick(): void {
    this.stateService.logout();
  }
}
