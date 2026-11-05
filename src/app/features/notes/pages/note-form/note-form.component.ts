import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotesStateService } from '../../services/notes-state.service';

@Component({
  selector: 'app-note-form',
  imports: [RouterLink, FormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css',
})
export class NoteFormComponent implements OnInit {
  readonly #notesState = inject(NotesStateService);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  readonly isEditing = signal(false);
  readonly noteId = signal<string | null>(null);
  readonly title = signal('');
  readonly content = signal('');
  readonly errorMessage = signal('');

  ngOnInit(): void {
    const id = this.#route.snapshot.paramMap.get('id');
    if (id) {
      const existingNote = this.#notesState.getNoteById(id);
      if (existingNote) {
        this.isEditing.set(true);
        this.noteId.set(id);
        this.title.set(existingNote.title);
        this.content.set(existingNote.content);
      } else {
        this.#router.navigate(['/notes']);
      }
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const cleanTitle = this.title().trim();
    const cleanContent = this.content().trim();

    if (!cleanTitle || !cleanContent) {
      this.errorMessage.set('Por favor, preencha o título e o conteúdo da anotação.');
      return;
    }

    if (this.isEditing()) {
      const id = this.noteId();
      if (id) {
        this.#notesState.updateNote(id, cleanTitle, cleanContent);
      }
    } else {
      this.#notesState.addNote(cleanTitle, cleanContent);
    }

    this.#router.navigate(['/notes']);
  }
}

