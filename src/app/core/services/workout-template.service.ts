import { Injectable, computed, signal } from '@angular/core';

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

export type WorkoutTemplate = {
  id: string;
  name: string;
  exercises: Exercise[];
};

@Injectable({ providedIn: 'root' })
export class WorkoutTemplateService {
  templates = signal<WorkoutTemplate[]>([
    {
      id: 'template-strength',
      name: 'Strength Split',
      exercises: [
        { id: 'ex-bench', name: 'Bench Press', sets: 4, reps: 6, weight: 185 },
        { id: 'ex-row', name: 'Bent-Over Row', sets: 4, reps: 8, weight: 135 },
        { id: 'ex-press', name: 'Overhead Press', sets: 3, reps: 8, weight: 95 }
      ]
    },
    {
      id: 'template-hybrid',
      name: 'Hybrid Conditioning',
      exercises: [
        { id: 'ex-thruster', name: 'Thruster', sets: 3, reps: 12, weight: 75 },
        { id: 'ex-run', name: 'Row Sprint', sets: 4, reps: 250, weight: 0 },
        { id: 'ex-swing', name: 'Kettlebell Swing', sets: 4, reps: 15, weight: 35 }
      ]
    }
  ]);

  selectedTemplateId = signal(this.templates()[0]?.id ?? '');

  selectedTemplate = computed(() => {
    const activeId = this.selectedTemplateId();
    return this.templates().find(template => template.id === activeId) ?? null;
  });

  setActiveTemplate(templateId: string): void {
    this.selectedTemplateId.set(templateId);
  }

  addTemplate(): void {
    const templateId = `template-${Date.now()}`;
    const newTemplate: WorkoutTemplate = {
      id: templateId,
      name: 'New Template',
      exercises: [{ id: `ex-${Date.now()}-1`, name: 'New Exercise', sets: 3, reps: 10, weight: 0 }]
    };

    this.templates.update(templates => [...templates, newTemplate]);
    this.selectedTemplateId.set(templateId);
  }

  updateTemplateName(name: string): void {
    this.updateTemplate(template => ({ ...template, name }));
  }

  addExercise(): void {
    this.updateTemplate(template => ({
      ...template,
      exercises: [
        ...template.exercises,
        {
          id: `ex-${Date.now()}-${template.exercises.length + 1}`,
          name: 'New Exercise',
          sets: 3,
          reps: 10,
          weight: 0
        }
      ]
    }));
  }

  removeExercise(exerciseId: string): void {
    this.updateTemplate(template => ({
      ...template,
      exercises: template.exercises.filter(exercise => exercise.id !== exerciseId)
    }));
  }

  updateExercise(exerciseId: string, field: keyof Exercise, value: string): void {
    const nextValue = field === 'name' ? value : this.toNumber(value);

    this.updateTemplate(template => ({
      ...template,
      exercises: template.exercises.map(exercise => {
        if (exercise.id !== exerciseId) {
          return exercise;
        }

        return {
          ...exercise,
          [field]: nextValue
        } as Exercise;
      })
    }));
  }

  private updateTemplate(updateFn: (template: WorkoutTemplate) => WorkoutTemplate): void {
    const activeId = this.selectedTemplateId();
    if (!activeId) {
      return;
    }

    this.templates.update(templates =>
      templates.map(template => (template.id === activeId ? updateFn(template) : template))
    );
  }

  private toNumber(value: string): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
}
