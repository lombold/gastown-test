import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WorkoutTemplateService } from '../../core/services/workout-template.service';

@Component({
  selector: 'app-configuration-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './configuration.page.html',
  styleUrl: './configuration.page.scss'
})
export class ConfigurationPage {
  private templateService = inject(WorkoutTemplateService);

  templates = this.templateService.templates;
  selectedTemplateId = this.templateService.selectedTemplateId;
  selectedTemplate = this.templateService.selectedTemplate;

  setActiveTemplate(templateId: string): void {
    this.templateService.setActiveTemplate(templateId);
  }

  addTemplate(): void {
    this.templateService.addTemplate();
  }

  updateTemplateName(name: string): void {
    this.templateService.updateTemplateName(name);
  }

  addExercise(): void {
    this.templateService.addExercise();
  }

  removeExercise(exerciseId: string): void {
    this.templateService.removeExercise(exerciseId);
  }

  updateExercise(exerciseId: string, field: 'name' | 'sets' | 'reps' | 'weight', value: string): void {
    this.templateService.updateExercise(exerciseId, field, value);
  }
}
