import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  // Inputs
  title = input<string>('Gastowntest');
  showMenu = input<boolean>(true);
  userName = input<string | null>(null);
  isAuthenticated = input<boolean>(false);

  // Outputs
  menuToggled = output<void>();
  loginClicked = output<void>();
  logoutClicked = output<void>();

  onMenuToggle(): void {
    this.menuToggled.emit();
  }

  onLoginClick(): void {
    this.loginClicked.emit();
  }

  onLogoutClick(): void {
    this.logoutClicked.emit();
  }
}
