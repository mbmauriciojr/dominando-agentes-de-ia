---
description: Diretrizes de layout, navegação e estrutura de interface da aplicação de anotações
globs: src/app/**/*.ts, src/app/**/*.html
---

# Diretrizes de Layout e Estrutura de Interface

Este documento estabelece as regras e padrões obrigatórios para o layout, estrutura visual e fluxo de navegação da aplicação de anotações. Todos os agentes e desenvolvedores devem seguir rigorosamente estas diretrizes para assegurar uma experiência de usuário consistente, simples e funcional.

---

## 1. Princípios de Design

1. **Simples e Funcional:** A interface deve ser limpa, intuitiva e sem sobrecarga de elementos decorativos ou animações excessivas.
2. **Componentes daisyUI e Tailwind CSS:** Construir os elementos visuais utilizando prioritariamente os componentes semânticos do daisyUI (`navbar`, `card`, `modal`, `btn`, `form-control`) estilizados com classes utilitárias do Tailwind CSS.
3. **Consistência de Ações:** O fluxo do usuário deve ser previsível: rotas dedicadas para criação e edição, e modais para ações destrutivas (exclusão).

---

## 2. Estrutura Base da Aplicação (App Shell)

O layout global da aplicação (definido no componente raiz `AppComponent`) deve seguir uma estrutura vertical clara e centralizada:

- **Header com Título:**
  - A aplicação deve possuir uma barra superior (`header` ou `navbar` do daisyUI) contendo o título da aplicação visível em destaque.
  - O header deve ter suporte a link de navegação de volta para a Home ao clicar no título ou logotipo.
- **Roteamento Centralizado:**
  - O roteamento (`<router-outlet />`) deve estar posicionado na área central (`main`) da aplicação.
  - A área de conteúdo deve ser centralizada na tela, com largura máxima delimitada (ex.: `container mx-auto max-w-4xl px-4 py-8`) e espaçamento adequado.

### ✅ Exemplo da Estrutura Raiz (`app.html`)
```html
<div class="min-h-screen flex flex-col bg-base-200">
  <!-- Header da Aplicação -->
  <header class="navbar bg-base-100 shadow-sm border-b border-base-300 px-4 sm:px-8">
    <div class="container mx-auto max-w-4xl flex items-center justify-between">
      <a routerLink="/" class="text-xl font-bold tracking-tight text-primary">
        Minhas Anotações
      </a>
    </div>
  </header>

  <!-- Área Central com Roteamento -->
  <main class="flex-1 container mx-auto max-w-4xl w-full px-4 py-8">
    <router-outlet />
  </main>
</div>
```

---

## 3. Página Home (Listagem de Anotações)

A página inicial (`/` ou `/notes`) é o ponto de entrada da aplicação e é responsável por listar todas as anotações salvas.

### 3.1. Botão Adicionar Anotação
- **Posicionamento Obrigatório:** Deve haver um botão de ação com destaque posicionado **acima da listagem** de anotações.
- **Comportamento:** O botão deve redirecionar o usuário para a página de formulário de adição (ex.: `routerLink="/notes/new"`).
- **Estilo:** Utilizar estilo de destaque (ex.: `btn btn-primary`).

### 3.2. Renderização em Cards
- Cada anotação deve ser renderizada dentro de um componente de **Card** (`card bg-base-100 shadow-md` do daisyUI).
- Cada card deve exibir:
  - Título da anotação.
  - Conteúdo ou resumo do texto da anotação.
  - Metadados relevantes (se existirem, como data de criação/atualização).
  - Barra de ações (`card-actions`) contendo os botões de **Editar** e **Remover**.
- O grid ou lista de cards deve possuir espaçamento consistente (`flex flex-col gap-4` ou `grid grid-cols-1 md:grid-cols-2 gap-4`).

### 3.3. Estado Vazio (Empty State)
- Caso não haja nenhuma anotação cadastrada, a tela deve utilizar o bloco `@empty` do Angular para exibir uma mensagem informativa amigável e convidar o usuário a criar sua primeira anotação.

### ✅ Exemplo de Estrutura da Home (`home.component.html`)
```html
<div class="flex flex-col gap-6">
  <!-- Barra de Ações Superior (Acima da Listagem) -->
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-bold text-base-content">Todas as Anotações</h1>
    <a routerLink="/notes/new" class="btn btn-primary">
      Nova Anotação
    </a>
  </div>

  <!-- Listagem de Cards -->
  <div class="grid grid-cols-1 gap-4">
    @for (note of notes(); track note.id) {
      <div class="card bg-base-100 shadow-sm border border-base-300">
        <div class="card-body">
          <h2 class="card-title text-lg font-semibold">{{ note.title }}</h2>
          <p class="text-base-content/80 whitespace-pre-wrap">{{ note.content }}</p>
          
          <!-- Ações dentro do Card -->
          <div class="card-actions justify-end mt-4 pt-2 border-t border-base-200">
            <a [routerLink]="['/notes', note.id, 'edit']" class="btn btn-sm btn-outline">
              Editar
            </a>
            <button type="button" (click)="openDeleteModal(note)" class="btn btn-sm btn-error btn-outline">
              Remover
            </button>
          </div>
        </div>
      </div>
    } @empty {
      <div class="text-center py-12 bg-base-100 rounded-box border border-base-300">
        <p class="text-base-content/70 text-lg">Nenhuma anotação cadastrada ainda.</p>
        <a routerLink="/notes/new" class="btn btn-primary btn-sm mt-4">
          Criar primeira anotação
        </a>
      </div>
    }
  </div>
</div>
```

---

## 4. Ações no Card: Editar e Remover

As ações sobre uma anotação existente devem ser disparadas **exclusivamente a partir dos botões contidos dentro do respectivo card**:

### 4.1. Ação de Editar
- **Comportamento:** O botão de editar no card direciona o usuário para uma **página com formulário** dedicada (ex.: rota `/notes/:id/edit`).
- **Proibição:** Não realizar edição inline no card ou edição direta via prompt de texto.

### 4.2. Ação de Remover
- **Comportamento:** O botão de remover no card deve disparar a abertura de uma **modal de confirmação**.
- **Proibição:** A remoção não pode ser executada imediatamente sem a confirmação explícita do usuário na modal.

---

## 5. Páginas com Formulário (Adicionar e Editar)

Tanto a inclusão quanto a alteração de anotações devem ocorrer em páginas dedicadas com rotas próprias no roteador central.

### 5.1. Requisitos do Formulário
- **Campos:**
  - Campo de entrada para o título da anotação (`input input-bordered`).
  - Área de texto para o conteúdo da anotação (`textarea textarea-bordered`).
- **Validações e Acessibilidade:**
  - Validações claras de obrigatoriedade e mensagens de erro visíveis caso o usuário tente submeter campos vazios.
  - Labels associados a cada controle do formulário.
- **Ações do Formulário:**
  - Botão de envio primário: "Salvar" ou "Criar Anotação" (adição) / "Atualizar" (edição).
  - Botão de cancelamento: "Cancelar" ou "Voltar", retornando para a listagem (`/`).

### 5.2. Página de Adicionar (`/notes/new`)
- Formulário limpo e pronto para preenchimento.
- Título da página: "Nova Anotação" ou "Adicionar Anotação".

### 5.3. Página de Editar (`/notes/:id/edit`)
- Carrega e preenche previamente os dados da anotação correspondente ao ID informado na rota.
- Título da página: "Editar Anotação".
- Tratar estado de anotação não encontrada redirecionando para a listagem com feedback.

### ✅ Exemplo de Estrutura de Formulário
```html
<div class="card bg-base-100 shadow-sm border border-base-300 max-w-2xl mx-auto">
  <div class="card-body">
    <h1 class="card-title text-xl font-bold mb-4">{{ isEditing() ? 'Editar Anotação' : 'Nova Anotação' }}</h1>

    <form (submit)="onSubmit($event)" class="flex flex-col gap-4">
      <div class="form-control">
        <label class="label">
          <span class="label-text font-medium">Título</span>
        </label>
        <input
          type="text"
          placeholder="Ex: Tarefas do dia"
          class="input input-bordered w-full"
          [value]="title()"
          (input)="title.set($any($event.target).value)"
          required
        />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text font-medium">Conteúdo</span>
        </label>
        <textarea
          rows="6"
          placeholder="Digite os detalhes da sua anotação..."
          class="textarea textarea-bordered w-full"
          [value]="content()"
          (input)="content.set($any($event.target).value)"
          required
        ></textarea>
      </div>

      <div class="card-actions justify-end gap-2 mt-4">
        <a routerLink="/" class="btn btn-ghost">Cancelar</a>
        <button type="submit" class="btn btn-primary">
          {{ isEditing() ? 'Atualizar' : 'Salvar' }}
        </button>
      </div>
    </form>
  </div>
</div>
```

---

## 6. Modal de Confirmação de Remoção

A remoção de qualquer anotação deve ser protegida por uma modal de confirmação para prevenir perdas acidentais.

### 6.1. Diretrizes da Modal
- Utilizar o elemento nativo `<dialog class="modal">` estilizado pelo daisyUI.
- O controle de abertura/fechamento deve ser reativo, gerenciado por Signals (ex.: `noteToDelete = signal<Note | null>(null)`).
- A mensagem deve deixar claro o título do item prestes a ser removido.
- A modal deve conter dois botões:
  - **Confirmar Exclusão:** estilo destrutivo (`btn btn-error`), disparando a exclusão efetiva.
  - **Cancelar:** fecha a modal sem realizar alterações.

### ✅ Exemplo da Modal de Remoção
```html
@if (noteToDelete(); as note) {
  <dialog class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg text-error">Confirmar Remoção</h3>
      <p class="py-4">
        Tem certeza de que deseja remover a anotação <strong>"{{ note.title }}"</strong>? Esta ação não pode ser desfeita.
      </p>
      <div class="modal-action">
        <button type="button" class="btn btn-ghost" (click)="closeDeleteModal()">
          Cancelar
        </button>
        <button type="button" class="btn btn-error" (click)="confirmDelete()">
          Sim, remover
        </button>
      </div>
    </div>
    <div class="modal-backdrop bg-neutral/40" (click)="closeDeleteModal()"></div>
  </dialog>
}
```

---

## 7. Mapeamento de Rotas da Aplicação

| Rota              | Componente / Visão        | Descrição e Ações                                                                 |
| :---------------- | :------------------------ | :-------------------------------------------------------------------------------- |
| `/` ou `/notes`   | Listagem (Home)           | Exibe lista de cards de anotações, botão de adição no topo e modal de confirmação |
| `/notes/new`      | Página de Adição          | Página com formulário para cadastro de nova anotação                              |
| `/notes/:id/edit` | Página de Edição          | Página com formulário para atualizar dados da anotação existente                  |

---

## 8. Resumo das Regras

| Elemento / Ação               | Padrão Exigido                                                                      |
| :---------------------------- | :---------------------------------------------------------------------------------- |
| **Header**                    | Presente no topo da aplicação, com título visível em destaque.                      |
| **Área Central (Roteamento)** | `<router-outlet />` centralizado com largura máxima e espaçamento vertical.        |
| **Cards de Anotação**         | Cada anotação renderizada em um card daisyUI com título, conteúdo e ações.         |
| **Listagem Home**             | Página inicial lista todas as anotações ou exibe estado vazio.                      |
| **Botão de Adicionar**        | Localizado obrigatoriamente **acima** da lista de anotações na Home.                |
| **Ação Adicionar**            | Navega para **página com formulário** (`/notes/new`).                               |
| **Ações Editar/Remover**      | Disparadas exclusivamente via botões posicionados **dentro de cada card**.          |
| **Ação Editar**               | Navega para **página com formulário** (`/notes/:id/edit`).                          |
| **Ação Remover**              | Aciona obrigatoriamente uma **modal de confirmação** antes de excluir.              |
| **Design Geral**              | Simples, funcional, limpo e responsivo com Tailwind CSS e daisyUI.                  |

