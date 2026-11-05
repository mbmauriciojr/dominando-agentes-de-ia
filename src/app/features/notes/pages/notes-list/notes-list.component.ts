import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Note } from '../../models/note.models';
import { NotesStateService } from '../../services/notes-state.service';

@Component({
  selector: 'app-notes-list',
  imports: [RouterLink, FormsModule, DatePipe],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css',
})
export class NotesListComponent {
  readonly #notesState = inject(NotesStateService);

  readonly searchQuery = signal('');
  readonly noteToDelete = signal<Note | null>(null);

  readonly currentUser = computed(() => this.#notesState.currentUser());

  readonly userInitials = computed(() => {
    const name = this.currentUser().name.trim();
    if (!name) return 'U';
    const parts = name.split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  });

  readonly userNotes = computed(() => {
    const currentUserId = this.currentUser().id;
    return this.#notesState.notes().filter((note) => note.userId === currentUserId);
  });

  readonly userNotesCount = computed(() => this.userNotes().length);

  readonly filteredNotes = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const notes = this.userNotes();

    if (!query) {
      return notes;
    }

    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query),
    );
  });

  clearSearch(): void {
    this.searchQuery.set('');
  }

  openDeleteModal(note: Note): void {
    this.noteToDelete.set(note);
  }

  closeDeleteModal(): void {
    this.noteToDelete.set(null);
  }

  confirmDelete(): void {
    const note = this.noteToDelete();
    if (note) {
      this.#notesState.deleteNote(note.id);
      this.closeDeleteModal();
    }
  }
}
