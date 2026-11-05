import { Note } from '../models/note.models';

export const INITIAL_NOTES: Note[] = [
  {
    id: 'note-1',
    userId: 'usr-1',
    title: 'Reunião de Alinhamento - Agentes de IA',
    content:
      'Discutir a arquitetura do sistema com Angular Signals, componentes semânticos do DaisyUI e Tailwind CSS.',
    createdAt: '2026-11-04T10:00:00.000Z',
  },
  {
    id: 'note-2',
    userId: 'usr-1',
    title: 'Estudo do Angular 22',
    content:
      'Explorar as novidades do controle de fluxo (@if, @for), decorators @Service e reatividade avançada com Signals.',
    createdAt: '2026-11-05T09:30:00.000Z',
  },
  {
    id: 'note-3',
    userId: 'usr-1',
    title: 'Boas Práticas de UI com DaisyUI e Tailwind',
    content:
      'Utilizar sempre classes semânticas como card, btn, modal, navbar sem recriar CSS manual nem utilizar cores hardcoded.',
    createdAt: '2026-11-05T13:15:00.000Z',
  },
];
