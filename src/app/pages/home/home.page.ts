import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WorkoutTemplateService } from '../../core/services/workout-template.service';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss'
})
export class HomePage {
  private templateService = inject(WorkoutTemplateService);

  selectedTemplate = this.templateService.selectedTemplate;
}
