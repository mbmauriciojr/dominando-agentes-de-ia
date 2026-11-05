
# 📝 Dominando Agentes de IA — Gerenciador de Anotações (Notes App)

Aplicação web moderna de gerenciamento de anotações pessoais desenvolvida como projeto prático do ecossistema **Dominando Agentes de IA**. O projeto implementa uma arquitetura robusta baseada em **Core-Shared-Features**, reatividade de ponta a ponta com **Angular Signals**, interface semântica com **daisyUI** e estilização utilitária com **Tailwind CSS v4**.


---


## 🎯 Objetivos do Projeto


- **Laboratório Prático para Agentes de IA:** Servir como base e referência de código limpo, tipado e estruturado para desenvolvimento assistido por agentes autônomos de inteligência artificial (com regras arquiteturais em `.agents/rules` e `.cursor/rules`).
- **Adoção dos Recursos Modernos do Angular:** Utilização intensiva de componentes standalone, novo fluxo de controle nativo (`@if`, `@for`, `@empty`), injeção de dependências via `inject()` e reatividade com Signals (`signal()`, `computed()`).
- **Arquitetura Escalável e Desacoplada:** Organização modular orientada ao padrão _Core-Shared-Features_, garantindo separação rígida entre infraestrutura, regras de negócio e componentes compartilhados.
- **Experiência de Usuário Simples e Eficiente:** Interface responsiva com listagem em cards, busca reativa em tempo real, formulários dedicados de criação/edição e confirmação em modal nativo para ações destrutivas.
- **Persistência Local Confiável:** Armazenamento seguro de estado no navegador (`localStorage`) com carregamento inicial resiliente (_fallback_ para notas padrão).

---


## 🛠️ Tecnologias Utilizadas e Versões

A stack tecnológica do projeto segue as diretrizes oficiais definidas para o repositório:

| Tecnologia                                        | Versão     | Papel no Projeto                                                              |
| :------------------------------------------------ | :--------- | :---------------------------------------------------------------------------- |
| **[Angular](https://angular.dev/)**               | `^22.2.0`  | Framework SPA frontend moderno com componentes Standalone                     |
| **[Angular CLI](https://angular.dev/tools/cli)**  | `^22.2.5`  | Ferramenta de linha de comando para scaffold, build e deploy                  |
| **[Tailwind CSS](https://tailwindcss.com/)**      | `^4.1.12`  | Framework CSS utilitário (arquitetura CSS-first via `@import "tailwindcss";`) |
| **[daisyUI](https://daisyui.com/)**               | `^5.7.50`  | Biblioteca de componentes semânticos (`card`, `btn`, `modal`, `navbar`, etc.) |
| **[TypeScript](https://www.typescriptlang.org/)** | `~6.0.2`   | Linguagem base com tipagem estática rigorosa (_Strict Mode_)                  |
| **[RxJS](https://rxjs.dev/)**                     | `~7.8.0`   | Biblioteca reativa para streams assíncronos e interoperabilidade              |
| **[Node.js](https://nodejs.org/)**                | `>= 22.x`  | Ambiente de execução JavaScript                                               |
| **[npm](https://www.npmjs.com/)**                 | `^11.19.1` | Gerenciador de pacotes padrão                                                 |

---

## 🚀 Como Instalar e Executar

### Pré-requisitos

Certifique-se de possuir em seu ambiente:

- **Node.js** (versão 22 ou superior recomendada)
- **npm** (versão 11 ou superior) ou **Angular CLI** instalado globalmente

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/dominando-agentes-de-ia.git
cd dominando-agentes-de-ia
```


### 2. Instalar as Dependências

```bash
npm install
```

### 3. Executar o Servidor de Desenvolvimento

```bash
npm start
# ou
npx ng serve
```

Acesse a aplicação no seu navegador em: [`http://localhost:4200/`](http://localhost:4200/)
A aplicação recarrega automaticamente ao detectar alterações no código fonte.


### 4. Outros Comandos Disponíveis


| Comando         | Finalidade                                                 |
| :-------------- | :--------------------------------------------------------- |
| `npm run build` | Compila o projeto otimizado para produção na pasta `dist/` |
| `npm run watch` | Executa o build contínuo em modo de desenvolvimento        |
| `npm test`      | Executa a suíte de testes unitários                        |

---

## 📐 Arquitetura de Pastas (Core-Shared-Features)

A aplicação segue a divisão estrita de responsabilidades:

```text
src/
├── app/
│   ├── core/                        # Recursos singleton e infraestrutura global
│   │   └── tokens/
│   │       └── storage.tokens.ts    # InjectionToken seguro para LOCAL_STORAGE
│   ├── features/                    # Módulos de domínio de negócio (Lazy Loaded)
│   │   └── notes/                   # Funcionalidade de anotações
│   │       ├── constants/           # Constantes em runtime (dados iniciais, chaves de storage)
│   │       │   ├── current-user.constants.ts
│   │       │   ├── initial-notes.constants.ts
│   │       │   └── notes-storage.constants.ts
│   │       ├── models/              # Interfaces e types TypeScript puros
│   │       │   ├── note.models.ts
│   │       │   ├── notes-state.models.ts
│   │       │   └── user.models.ts
│   │       ├── pages/               # Páginas roteadas da feature
│   │       │   ├── note-form/       # Formulário de criação/edição de anotação
│   │       │   └── notes-list/      # Listagem de cards, busca e modal de exclusão
│   │       ├── services/            # Serviços de estado da feature (Signals)
│   │       │   └── notes-state.service.ts
│   │       └── notes.routes.ts      # Rotas filhas com lazy loading
│   ├── app.config.ts                # Configuração e provedores globais da aplicação
│   ├── app.html                     # App Shell com navbar e <router-outlet />
│   ├── app.routes.ts                # Roteamento raiz redirecionando para /notes
│   └── app.ts                       # Componente raiz standalone
├── styles.css                       # Importação do Tailwind 4 e plugin daisyUI 5
└── main.ts                          # Bootstrap da aplicação Angular
````

### Regras de Ouro da Arquitetura:

1. **Separação de Modelos e Constantes:** Interfaces (`*.models.ts`) nunca residem no mesmo arquivo que valores em tempo de execução (`*.constants.ts`).
2. **Gerenciamento de Estado Reativo:** O estado global/local da feature fica centralizado no `NotesStateService` usando Angular Signals (`signal`, `computed`), garantindo reatividade de granularidade fina sem necessidade de gerenciadores de estado externos pesados.
3. **Desacoplamento de APIs Nativas:** Uso de `InjectionToken` (`LOCAL_STORAGE`) para acesso seguro ao `localStorage`, prevenindo quebras em ambientes SSR e facilitando testes unitários.

---


## ⚡ Funcionalidades (Features)

1. **Painel do Usuário e Cabeçalho:**
   - Exibição de avatar dinâmico com as iniciais do usuário atual.
   - Nome e e-mail do usuário ativo vinculados ao estado.
   - Contador de anotações em tempo real via badge semântico (`X anotações`).

2. **Listagem de Anotações em Cards:**
   - Renderização limpa em cards semânticos do daisyUI (`card bg-base-100 shadow-sm`).
   - Apresentação do título, conteúdo com quebras de linha preservadas (`whitespace-pre-wrap`) e data formatada (`dd/MM/yyyy HH:mm`).
   - Botões contextuais de **Editar** e **Remover** no rodapé de cada card.

3. **Busca e Filtro em Tempo Real:**
   - Campo de busca com *two-way binding* vinculado a Signal.
   - Filtro instantâneo no título e conteúdo das anotações do usuário ativo.
   - Estado vazio (*Empty State*) inteligente com opção de "Limpar busca" ou "Criar primeira anotação".

4. **Criação de Anotações (`/notes/new`):**
   - Rota e formulário dedicados para criação de novas anotações.
   - Validações de obrigatoriedade com alertas de erro semânticos (`alert alert-error`).
   - Geração automática de ID único, carimbo de data/hora (`createdAt`) e vínculo com o usuário logado.

5. **Edição de Anotações (`/notes/:id/edit`):**
   - Rota parametrizada que recupera automaticamente os dados da nota selecionada.
   - Preenchimento automático dos campos de título e conteúdo.
   - Registro automático de data de modificação (`updatedAt`).
   - Proteção de rota caso o ID não exista (redirecionamento de segurança para `/notes`).

6. **Remoção com Confirmação Segura:**
   - Abertura de modal nativo (`<dialog class="modal">`) ao clicar em "Remover" no card.
   - Exibição explícita do título da nota a ser removida para evitar exclusões acidentais.
   - Exclusão imediata do estado e sincronização com o armazenamento local.

7. **Persistência Automática em LocalStorage:**
   - Todas as alterações (inclusões, edições e remoções) são salvas automaticamente na chave `user_notes_state`.
   - Se o storage estiver vazio, a aplicação carrega um conjunto de anotações padrão informativas (`INITIAL_NOTES`).

---

## 🔄 Fluxos do Projeto

### 1. Fluxo de Navegação do Usuário

O diagrama abaixo ilustra os caminhos de navegação e as interações do usuário entre as telas da aplicação:

```mermaid
flowchart TD
    Start([Início]) --> Redirect["Rota Raiz '/'"]
    Redirect --> NotesList["Página de Listagem (/notes)"]

    NotesList -->|Digita no campo de busca| FilterNotes["Filtra Cards em Tempo Real"]
    NotesList -->|Clica em 'Nova Anotação'| NewNotePage["Página de Criação (/notes/new)"]
    NotesList -->|Clica em 'Editar' no Card| EditNotePage["Página de Edição (/notes/:id/edit)"]
    NotesList -->|Clica em 'Remover' no Card| OpenDeleteModal["Abre Modal de Confirmação"]

    %% Criação
    NewNotePage -->|Preenche dados e clica 'Salvar'| SaveNewNote["Adiciona ao Estado & LocalStorage"]
    NewNotePage -->|Clica em 'Cancelar'| NotesList
    SaveNewNote --> NotesList

    %% Edição
    EditNotePage -->|Altera dados e clica 'Atualizar'| UpdateNote["Atualiza Estado & LocalStorage"]
    EditNotePage -->|Clica em 'Cancelar'| NotesList
    UpdateNote --> NotesList

    %% Exclusão
    OpenDeleteModal -->|Clica em 'Sim, remover'| ConfirmDelete["Remove do Estado & LocalStorage"]
    OpenDeleteModal -->|Clica em 'Cancelar' ou Backdrop| CloseModal["Fecha Modal"]
    ConfirmDelete --> CloseModal
    CloseModal --> NotesList
````

---


### 2. Fluxo de Gerenciamento de Estado e Reatividade

O fluxo de dados da aplicação segue o princípio de **fluxo unidirecional de dados** orquestrado por Signals:

```mermaid
flowchart LR
    subgraph UI["Interface do Usuário (Componentes)"]
        Form["NoteFormComponent (Inputs/Submit)"]
        List["NotesListComponent (Cards / Busca / Modal)"]
    end

    subgraph StateService["NotesStateService"]
        Actions["Ações: addNote() / updateNote() / deleteNote() / setSearchQuery()"]
        SignalState["#state = signal&lt;NotesState&gt;(...)"]
        ComputedValues["computed: filteredNotes(), totalCount(), currentUser()"]
    end

    subgraph Storage["Camada de Persistência"]
        LocalStorage["LOCAL_STORAGE (Token / Window.localStorage)"]
    end

    %% Relações
    Form -->|Dispara ações| Actions
    List -->|Dispara ações| Actions
    Actions -->|Atualiza estado| SignalState
    SignalState -->|Persiste dados| LocalStorage
    LocalStorage -.->|Carga inicial / Fallback| SignalState
    SignalState -->|Notifica alterações| ComputedValues
    ComputedValues -->|Atualiza bindings automaticamente| List
````

---

## 📋 Mapeamento de Rotas


| Rota              | Tipo de Carga  | Componente           | Descrição                                                            |
| :---------------- | :------------- | :------------------- | :------------------------------------------------------------------- |
| `/`               | Eager Redirect | —                    | Redireciona imediatamente para `/notes`                              |
| `/notes`          | Lazy Loaded    | `NotesListComponent` | Listagem de anotações, pesquisa, card do usuário e modal de exclusão |
| `/notes/new`      | Lazy Loaded    | `NoteFormComponent`  | Formulário para adicionar uma nova anotação                          |
| `/notes/:id/edit` | Lazy Loaded    | `NoteFormComponent`  | Formulário para editar anotação existente pelo ID                    |

---

## 🤖 Padrões e Diretrizes para Agentes de IA

Este repositório foi construído para interoperar perfeitamente com ferramentas de automação e agentes de IA (como Gemini, Cursor e Claude). As regras vigentes incluem:

1. **Angular 22 First:** Não utilizar `@NgModule` nem diretivas legadas (`*ngIf`, `*ngFor`). Usar controle de fluxo nativo (`@if`, `@for`).
2. **Reatividade com Signals:** Evitar `BehaviorSubject` para estados locais síncronos; priorizar `signal()` e `computed()`.
3. **Tailwind CSS v4 & daisyUI v5:** Utilizar classes semânticas (`btn`, `card`, `modal`, `badge`) e não adicionar arquivos legados como `tailwind.config.js`.
4. **TypeScript Strict:** Proibido o uso de `any`. Toda assinatura e retorno de métodos deve possuir tipagem estrita.

---

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e profissionais no contexto do treinamento **Dominando Agentes de IA**. Sinta-se livre para estudar, modificar e contribuir!
