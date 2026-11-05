import { Note } from './note.models';
import { User } from './user.models';

export interface NotesState {
  currentUser: User;
  notes: Note[];
  searchQuery: string;
  isLoading: boolean;
}

