import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  // Inputs for data
  title = input<string>('');
  description = input<string>('');
  imageUrl = input<string>('');
  showActions = input<boolean>(true);

  // Outputs for events
  cardClicked = output<void>();
  actionClicked = output<void>();

  onCardClick(): void {
    this.cardClicked.emit();
  }

  onActionClick(event: Event): void {
    event.stopPropagation();
    this.actionClicked.emit();
  }
}
