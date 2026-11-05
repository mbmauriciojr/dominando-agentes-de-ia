import { Routes } from '@angular/router';

export const NOTES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/notes-list/notes-list.component').then((m) => m.NotesListComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/note-form/note-form.component').then((m) => m.NoteFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/note-form/note-form.component').then((m) => m.NoteFormComponent),
  },
];

