import { InjectionToken, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export const LOCAL_STORAGE = new InjectionToken<Storage>('LOCAL_STORAGE', {
  providedIn: 'root',
  factory: () => {
    const document = inject(DOCUMENT);
    return document.defaultView?.localStorage ?? ({} as Storage);
  },
});

