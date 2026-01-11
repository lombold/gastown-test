import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/ui/header/header.component';
import { SeoService } from '../../core/services/seo.service';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-about-page',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss'
})
export class AboutPage implements OnInit {
  // Smart component - injects services
  private seoService = inject(SeoService);
  private stateService = inject(StateService);

  // Access state service signals
  userName = this.stateService.userName;
  isAuthenticated = this.stateService.isAuthenticated;

  ngOnInit(): void {
    // Set SEO meta tags
    this.seoService.setPageMeta({
      title: 'About - Gastowntest',
      description: 'Learn about Gastowntest and the Smart/Presentational pattern architecture',
      keywords: 'angular, architecture, design patterns, ssr'
    });
  }

  onLoginClick(): void {
    this.stateService.simulateLogin('user@example.com');
  }

  onLogoutClick(): void {
    this.stateService.logout();
  }
}
