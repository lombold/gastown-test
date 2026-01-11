import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/ui/header/header.component';
import { ButtonComponent } from '../../components/ui/button/button.component';
import { SeoService } from '../../core/services/seo.service';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule, HeaderComponent, ButtonComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss'
})
export class DashboardPage implements OnInit {
  // Smart component - injects services
  private seoService = inject(SeoService);
  private stateService = inject(StateService);

  // Access state service signals
  currentUser = this.stateService.currentUser;
  userName = this.stateService.userName;
  isAuthenticated = this.stateService.isAuthenticated;
  isLoading = this.stateService.isLoading;

  // Local state with signals
  stats = signal({
    views: 1234,
    clicks: 567,
    conversions: 89
  });

  lastUpdated = signal(new Date());

  // Computed signals
  conversionRate = computed(() => {
    const s = this.stats();
    return s.clicks > 0 ? ((s.conversions / s.clicks) * 100).toFixed(2) : '0.00';
  });

  ngOnInit(): void {
    // Set SEO meta tags
    this.seoService.setPageMeta({
      title: 'Dashboard - Gastowntest',
      description: 'View your dashboard statistics and user information',
      keywords: 'dashboard, analytics, user profile'
    });
  }

  onRefreshStats(): void {
    // Simulate refreshing stats
    this.stats.set({
      views: Math.floor(Math.random() * 5000),
      clicks: Math.floor(Math.random() * 2000),
      conversions: Math.floor(Math.random() * 500)
    });
    this.lastUpdated.set(new Date());
  }

  onLoginClick(): void {
    this.stateService.simulateLogin('user@example.com');
  }

  onLogoutClick(): void {
    this.stateService.logout();
  }
}
