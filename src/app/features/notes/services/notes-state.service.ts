import { Service, computed, inject, signal } from '@angular/core';
import { LOCAL_STORAGE } from '../../../core/tokens/storage.tokens';
import { CURRENT_USER } from '../constants/current-user.constants';
import { INITIAL_NOTES } from '../constants/initial-notes.constants';
import { NOTES_STORAGE_KEY } from '../constants/notes-storage.constants';
import { Note } from '../models/note.models';
import { NotesState } from '../models/notes-state.models';

@Service()
export class NotesStateService {
  readonly #storage = inject(LOCAL_STORAGE);

  readonly #state = signal<NotesState>({
    currentUser: CURRENT_USER,
    notes: this.#loadInitialNotes(),
    searchQuery: '',
    isLoading: false,
  });

  readonly currentUser = computed(() => this.#state().currentUser);
  readonly notes = computed(() => this.#state().notes);
  readonly searchQuery = computed(() => this.#state().searchQuery);
  readonly isLoading = computed(() => this.#state().isLoading);

  readonly filteredNotes = computed(() => {
    const query = this.#state().searchQuery.trim().toLowerCase();
    const currentUserId = this.#state().currentUser.id;
    const userNotes = this.#state().notes.filter((note) => note.userId === currentUserId);

    if (!query) {
      return userNotes;
    }

    return userNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query),
    );
  });

  readonly totalCount = computed(() => {
    const currentUserId = this.#state().currentUser.id;
    return this.#state().notes.filter((note) => note.userId === currentUserId).length;
  });

  setSearchQuery(query: string): void {
    this.#state.update((state) => ({
      ...state,
      searchQuery: query,
    }));
  }

  addNote(title: string, content: string): Note {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      userId: this.#state().currentUser.id,
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    this.#state.update((state) => {
      const updatedNotes = [newNote, ...state.notes];
      this.#saveNotes(updatedNotes);
      return {
        ...state,
        notes: updatedNotes,
      };
    });

    return newNote;
  }

  updateNote(id: string, title: string, content: string): boolean {
    let updated = false;

    this.#state.update((state) => {
      const noteIndex = state.notes.findIndex((note) => note.id === id);
      if (noteIndex === -1) {
        return state;
      }

      updated = true;
      const updatedNotes = [...state.notes];
      updatedNotes[noteIndex] = {
        ...updatedNotes[noteIndex],
        title: title.trim(),
        content: content.trim(),
        updatedAt: new Date().toISOString(),
      };

      this.#saveNotes(updatedNotes);
      return {
        ...state,
        notes: updatedNotes,
      };
    });

    return updated;
  }

  deleteNote(id: string): void {
    this.#state.update((state) => {
      const updatedNotes = state.notes.filter((note) => note.id !== id);
      this.#saveNotes(updatedNotes);
      return {
        ...state,
        notes: updatedNotes,
      };
    });
  }

  getNoteById(id: string): Note | undefined {
    return this.#state().notes.find((note) => note.id === id);
  }

  #loadInitialNotes(): Note[] {
    try {
      const rawData = this.#storage.getItem?.(NOTES_STORAGE_KEY);
      if (rawData) {
        const parsed = JSON.parse(rawData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback para os dados iniciais em caso de indisponibilidade do storage
    }
    return INITIAL_NOTES;
  }

  #saveNotes(notes: Note[]): void {
    try {
      this.#storage.setItem?.(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // Falha silenciosa em caso de storage desabilitado ou SSR
    }
  }
}
