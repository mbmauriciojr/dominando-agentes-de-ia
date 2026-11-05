---
description: Stack tecnológica oficial e diretrizes das bibliotecas e frameworks do projeto
globs: **/*
---

# Stack Tecnológica do Projeto (Tech Stack)

Este documento define as tecnologias fundamentais, suas versões oficiais e as diretrizes de uso obrigatórias para o desenvolvimento neste projeto. Todos os agentes e desenvolvedores devem seguir estritamente essas definições.

---

## 1. Visão Geral das Tecnologias e Versões

| Tecnologia       | Versão Oficial | Papel Principal                                      |
| :--------------- | :------------- | :--------------------------------------------------- |
| **Angular**      | `22.x`         | Framework SPA frontend                               |
| **Tailwind CSS** | `4.x`          | Framework utilitário de CSS (arquitetura CSS-first)  |
| **daisyUI**      | `5.x`          | Sistema e biblioteca de componentes semânticos de UI |
| **RxJS**         | `7.8.x`        | Programação reativa assíncrona e streams de eventos  |
| **TypeScript**   | `6.x`          | Linguagem base e checagem de tipos estática          |

---

## 2. Diretrizes por Tecnologia

### 2.1. Angular 22

- **Standalone por Padrão:** Não utilizar `@NgModule`. Todos os componentes, diretivas e pipes são standalone.
- **Modern Control Flow:** Utilizar exclusivamente a sintaxe nativa de controle de fluxo nos templates:
  - `@if (condicao) { ... } @else { ... }`
  - `@for (item of itens; track item.id) { ... } @empty { ... }`
  - `@switch (valor) { @case (x) { ... } @default { ... } }`
  - **Proibido:** Diretivas legadas `*ngIf`, `*ngFor`, `*ngSwitch`.
- **Reatividade com Signals:**
  - Priorizar `signal()`, `computed()` e `effect()` para estado síncrono e reatividade de interface.
  - Usar signal inputs (`input()`, `input.required()`), signal outputs (`output()`) e signal models (`model()`).
  - Utilizar `computed` em vez de `signal.asReadonly`.
- **Injeção de Dependências:**
  - Priorizar a função `inject()` em vez de injeção tradicional por construtor.
  - Utilizar o decorator `@Service({ providedIn: 'root' })` para serviços (conforme diretrizes de estilo do projeto).
- **Templates e Estilos:**
  - Componentes devem ter template e estilos externos (`templateUrl: './component.html'`, `styleUrl: './component.css'`).
  - Carregamento sob demanda com blocos `@defer (on ...)`.

---

### 2.2. Tailwind CSS 4

- **Configuração CSS-First:**
  - O projeto utiliza a arquitetura moderna do Tailwind v4 iniciada via `@import 'tailwindcss';` no arquivo principal de estilos (`src/styles.css`).
  - **Proibido:** Criar ou esperar arquivos legados de configuração como `tailwind.config.js` ou `tailwind.config.ts`.
  - Configurações de tema, fontes e variáveis devem ser feitas diretamente no CSS utilizando a diretiva `@theme`.
- **Classes Utilitárias Modernas:**
  - Utilizar as classes utilitárias nativas do Tailwind 4 diretamente nos templates HTML.
  - Preferir binding de classes padrão do Angular (`[class.active]="isActive()"` ou `[class]="..."`) em vez da diretiva legada `[ngClass]`.

---

### 2.3. daisyUI 5

- **Integração:**
  - Configurado como plugin do Tailwind 4 via CSS (`@plugin 'daisyui';` em `src/styles.css`).
- **Uso de Componentes Semânticos:**
  - Priorizar o uso das classes semânticas de componentes do daisyUI 5 (`btn`, `btn-primary`, `card`, `card-body`, `modal`, `navbar`, `alert`, `badge`, `table`, etc.).
  - Evitar recriar estilos ou componentes utilitários complexos manualmente quando o daisyUI já fornecer uma classe semântica pronta.
- **Temas e Acessibilidade:**
  - Respeitar o sistema de temas do daisyUI via atributo `data-theme` (ex: `data-theme="light"` / `data-theme="dark"`).
  - Utilizar as cores semânticas da biblioteca (`primary`, `secondary`, `accent`, `neutral`, `base-100`, `base-200`, `base-300`, `info`, `success`, `warning`, `error`).

---

### 2.4. RxJS 7.8

- **Papel e Escopo:**
  - Usar RxJS principalmente para streams assíncronos complexos, requisições HTTP (`HttpClient`), web sockets, debounces de eventos de digitação ou orquestração multi-stream.
  - Para estado local de UI e valores derivados simples, utilizar **Angular Signals**.
- **Interoperabilidade (Signals + RxJS):**
  - Utilizar os utilitários de `@angular/core/rxjs-interop`:
    - `toSignal(observable$)` para converter streams em Signals nos componentes.
    - `toObservable(signal)` quando for necessário reagir a mudanças de Signals em pipelines RxJS.
- **Gerenciamento de Subscrições:**
  - Utilizar `takeUntilDestroyed()` dentro do contexto de injeção ou passando um `DestroyRef` explícito para evitar memory leaks.
  - **Proibido:** Subscrições aninhadas (`.subscribe()` dentro de `.subscribe()`). Usar operadores de transformação de ordem superior (`switchMap`, `mergeMap`, `concatMap`).

---

### 2.5. TypeScript 6

- **Strict Mode:**
  - Manter rigor estrito na tipagem em todos os arquivos (`noImplicitAny`, `strictNullChecks`, etc.).
  - **Proibido:** Uso de tipo `any`. Utilizar tipos genéricos, tipos específicos ou `unknown` acompanhado de type narrowing/guards.
- **Tipagem e Separação de Conceitos:**
  - Usar `import type` para importações exclusivas de tipo e interfaces.
  - Seguir a separação estrita do projeto: constantes em `*.constants.ts` e interfaces/tipos em `*.models.ts` ou `*.types.ts`.
- **Boas Práticas de Sintaxe:**
  - Declarar retornos explícitos em funções públicas e métodos de serviços.
  - Usar tipos imutáveis (`readonly`, `ReadonlyArray`, `as const`) sempre que aplicável.

---

## 3. Checklist Rápido para o Agente de IA

Antes de criar ou alterar código, valide:

1. [ ] **Angular:** O componente é standalone? Utiliza `@if`/`@for`? Usa Signals para reatividade? Usa `@Service` para serviços?
2. [ ] **Tailwind:** As classes são compatíveis com Tailwind 4? Não foi criado nenhum `tailwind.config.js`?
3. [ ] **daisyUI:** Utilizou as classes semânticas (`btn`, `card`, etc.) antes de inventar estilos manuais?
4. [ ] **RxJS:** Foi utilizado `takeUntilDestroyed` ou `toSignal`? Há algum vazamento de memória ou `.subscribe()` aninhado?
5. [ ] **TypeScript:** O código está 100% tipado sem nenhum `any`? Constantes e interfaces estão em arquivos separados?
