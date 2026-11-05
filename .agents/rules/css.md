---
description: Diretrizes de estilização da aplicação utilizando Tailwind CSS e daisyUI
globs: src/**/*.html, src/**/*.css, src/**/*.ts
---

# Diretrizes de Estilização: Tailwind CSS e daisyUI

Este documento estabelece as regras e padrões de estilo obrigatórios para o desenvolvimento da interface da aplicação. Todos os agentes e desenvolvedores devem seguir estas diretrizes para garantir consistência visual, manutenibilidade, conformidade com o design system e evitar duplicação de estilos.

---

## 1. Princípios Fundamentais

1. **Tailwind First:** Sempre utilizar classes utilitárias do Tailwind CSS diretamente nos templates HTML para criar os estilos da aplicação.
2. **Efeitos Nativos:** Utilizar animações, transições, sombras e filtros fornecidos pelo Tailwind CSS em vez de criá-los do zero.
3. **Componentes Prontos do daisyUI:** Sempre utilizar as classes e componentes semânticos do daisyUI antes de tentar construir elementos visuais manualmente do zero.
4. **Paleta de Cores Oficial:** Utilizar exclusivamente a paleta de cores do Tailwind e as cores semânticas do tema daisyUI, sendo estritamente proibido o uso de cores hardcoded (hexadecimais, rgb ou valores arbitrários soltos).

---

## 2. Uso Obrigatório do Tailwind CSS

- **Classes Utilitárias nos Templates:** A estilização deve ser aplicada prioritariamente via classes utilitárias diretamente nos arquivos de template (`*.component.html`).
- **Arquivos CSS Limpos:** Evite criar regras CSS manuais nos arquivos `*.component.css`. Os arquivos CSS de componentes devem permanecer limpos/vazios, sendo utilizados apenas em casos excepcionais onde utilitários não possam ser aplicados diretamente.
- **Proibição de Estilos Inline:** É proibido o uso de estilos inline (`style="..."` ou `[style]="..."`) para propriedades visuais tratáveis por classes utilitárias.
- **Binding de Classes no Angular:**
  - Utilize bindings nativos do Angular com classes utilitárias: `[class.hidden]="!isOpen()"`, `[class.opacity-50]="isDisabled()"`.
  - Evite o uso da diretiva legada `[ngClass]`.
- **Layouts Modernos:** Construa layouts responsivos usando utilitários do Tailwind (`flex`, `grid`, `gap-*`, `p-*`, `m-*`, breakpoints responsivos `sm:`, `md:`, `lg:`, `xl:`).

### ❌ Incorreto (CSS manual / estilo inline)
```html
<!-- Componente com estilo inline ou classes inventadas -->
<div style="display: flex; margin-top: 16px; padding: 12px;" class="custom-card-wrapper">
  <span>Conteúdo</span>
</div>
```

```css
/* component.css */
.custom-card-wrapper {
  display: flex;
  margin-top: 16px;
  padding: 12px;
  border-radius: 8px;
}
```

### ✅ Correto (Tailwind utility-first)
```html
<div class="flex mt-4 p-3 rounded-lg">
  <span>Conteúdo</span>
</div>
```

---

## 3. Animações, Sombras e Efeitos Visuais Nativos

Não recrie efeitos do zero. Efeitos visuais, sombras e animações devem utilizar as classes nativas do Tailwind CSS:

### 3.1. Sombras (Box Shadow)
- Utilize as classes de elevação do Tailwind:
  - `shadow-xs`, `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow-inner`, `shadow-none`.
- **Proibido:** Declarar `box-shadow: 0 4px 6px ...` em arquivos CSS ou criar classes customizadas para sombras.

### 3.2. Animações e Transições
- Utilize utilitários de animação embutidos:
  - `animate-spin` (para spinners/indicadores de loading).
  - `animate-pulse` (para esqueletos de carregamento / skeletons).
  - `animate-ping` (para notificações ou indicadores de status pulsantes).
  - `animate-bounce` (para ênfases visuais e chamadas de atenção).
- Utilize utilitários de transição para microinterações:
  - `transition`, `transition-all`, `transition-colors`, `transition-opacity`, `transition-transform`.
  - `duration-150`, `duration-200`, `duration-300`, `duration-500`.
  - `ease-in`, `ease-out`, `ease-in-out`.
  - Pseudo-classes: `hover:`, `focus:`, `active:`, `focus-visible:`.
- **Proibido:** Criar regras manuais com `@keyframes` ou transições CSS personalizadas nos componentes quando os utilitários do Tailwind atendem à necessidade.

### 3.3. Arredondamento, Opacidade e Filtros
- Raios de borda: `rounded-none`, `rounded-sm`, `rounded`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-full`.
- Opacidade: `opacity-0`, `opacity-25`, `opacity-50`, `opacity-75`, `opacity-100`, etc.
- Filtros e Desfoque: `blur-sm`, `backdrop-blur-md`, etc.

### ❌ Incorreto (Keyframes e sombras manuais)
```css
/* component.css */
.custom-card {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.custom-card:hover {
  transform: translateY(-4px);
}

@keyframes custom-spinner {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.my-loading-icon {
  animation: custom-spinner 1s linear infinite;
}
```

### ✅ Correto (Classes nativas do Tailwind)
```html
<div class="shadow-lg transition-transform duration-300 hover:-translate-y-1">
  <span class="animate-spin inline-block">⏳</span>
</div>
```

---

## 4. Uso de Componentes Prontos do daisyUI

O daisyUI fornece uma biblioteca rica de componentes semânticos, acessíveis e pré-estilizados. **Antes de construir qualquer elemento visual do zero, consulte e aplique os componentes do daisyUI.**

### 4.1. Mapeamento de Componentes daisyUI

| Elemento / Caso de Uso | Classes daisyUI Recomendadas |
| :--- | :--- |
| **Botões** | `btn`, `btn-primary`, `btn-secondary`, `btn-outline`, `btn-ghost`, `btn-sm`, `btn-lg`, `btn-circle` |
| **Cards e Painéis** | `card`, `card-body`, `card-title`, `card-actions`, `card-bordered` |
| **Formulários / Inputs** | `form-control`, `label`, `input`, `input-bordered`, `textarea`, `select`, `checkbox`, `toggle`, `radio`, `file-input` |
| **Alertas e Mensagens** | `alert`, `alert-info`, `alert-success`, `alert-warning`, `alert-error` |
| **Badges / Tags** | `badge`, `badge-primary`, `badge-outline`, `badge-sm`, `badge-lg` |
| **Modais e Diálogos** | `modal`, `modal-box`, `modal-action`, `modal-backdrop` |
| **Navegação / Menus** | `navbar`, `menu`, `menu-horizontal`, `breadcrumbs`, `tabs`, `tab`, `tab-active` |
| **Feedback e Loading** | `loading`, `loading-spinner`, `loading-dots`, `progress`, `skeleton` |
| **Tabelas** | `table`, `table-zebra`, `table-pin-rows` |
| **Overlays / Menus Suspensos**| `dropdown`, `dropdown-content`, `drawer`, `drawer-side`, `drawer-content` |
| **Tooltips / Dicas** | `tooltip`, `tooltip-top`, `tooltip-primary` |

### 4.2. Composição: daisyUI + Tailwind
Combine os componentes semânticos do daisyUI com classes utilitárias do Tailwind para espaçamentos, flexbox/grid e responsividade.

### ❌ Incorreto (Recriando botões e cards do zero)
```html
<!-- Recriando botão manualmente -->
<button class="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 active:scale-95">
  Salvar
</button>

<!-- Recriando card manualmente -->
<div class="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
  <h3 class="text-xl font-bold mb-2">Título</h3>
  <p class="text-gray-600">Descrição do card...</p>
</div>
```

### ✅ Correto (Utilizando daisyUI)
```html
<!-- Botão semântico daisyUI -->
<button class="btn btn-primary">
  Salvar
</button>

<!-- Card semântico daisyUI -->
<div class="card bg-base-100 shadow-md border border-base-200">
  <div class="card-body">
    <h3 class="card-title">Título</h3>
    <p>Descrição do card...</p>
  </div>
</div>
```

---

## 5. Paleta de Cores e Proibição de Cores Hardcoded

### 5.1. Regra Absoluta: Sem Cores Hardcoded
- **Estritamente Proibido:**
  - Valores hexadecimais: `#ffffff`, `#1e293b`, `#3b82f6`, etc.
  - Funções de cor CSS: `rgb(...)`, `rgba(...)`, `hsl(...)`.
  - Classes arbitrárias com valores literais soltos no Tailwind: `bg-[#1e40af]`, `text-[#333333]`, `border-[#e2e8f0]`.
  - Cores CSS nomeadas nativas hardcoded em arquivos CSS ou inline: `color: red;`, `background: black;`.

### 5.2. Cores Oficiais Autorizadas
Utilize exclusivamente as cores do ecossistema configurado:
1. **Cores Semânticas do Tema daisyUI (Altamente Recomendado para suporte a temas light/dark):**
   - Superfícies e Fundos: `bg-base-100`, `bg-base-200`, `bg-base-300`
   - Texto de Contraste: `text-base-content`, `text-primary-content`, `text-secondary-content`
   - Ações e Destaque: `bg-primary`, `bg-secondary`, `bg-accent`, `bg-neutral`
   - Estados de Feedback: `bg-info`, `bg-success`, `bg-warning`, `bg-error` (e `text-success`, `text-error`, etc.)
2. **Paleta Padrão do Tailwind CSS (Quando for necessária uma escala tonal específica):**
   - Neutros: `slate`, `gray`, `zinc`, `neutral`, `stone` (ex: `text-slate-700`, `border-slate-200`, `bg-gray-50`)
   - Cores de escala: `blue-*`, `emerald-*`, `amber-*`, `red-*`, `indigo-*`, etc. (ex: `text-blue-600`, `bg-emerald-100`)

### ❌ Incorreto (Cores hardcoded ou classes arbitrárias de cor)
```html
<!-- Hardcoded via inline style -->
<div style="background-color: #1e293b; color: #f8fafc;">
  <span style="color: #ef4444;">Ocorreu um erro</span>
</div>

<!-- Hardcoded via classes arbitrárias do Tailwind -->
<div class="bg-[#1e293b] text-[#f8fafc] border border-[#cbd5e1]">
  <span class="text-[#ef4444]">Ocorreu um erro</span>
</div>
```

### ✅ Correto (Cores semânticas e paleta Tailwind)
```html
<!-- Utilizando cores semânticas do tema daisyUI -->
<div class="bg-base-100 text-base-content border border-base-200">
  <span class="text-error">Ocorreu um erro</span>
</div>

<!-- Ou utilizando a paleta padrão do Tailwind -->
<div class="bg-slate-900 text-slate-50 border border-slate-300">
  <span class="text-red-500">Ocorreu um erro</span>
</div>
```

---

## 6. Checklist de Validação para o Agente de IA

Antes de concluir qualquer tarefa envolvendo interface ou estilização, valide:

1. [ ] **Tailwind Utilizado:** Todos os estilos foram construídos com classes utilitárias do Tailwind nos templates HTML?
2. [ ] **Sem CSS Desnecessário:** Os arquivos `*.component.css` estão limpos de regras redundantes e livres de estilos inline (`style="..."`)?
3. [ ] **Efeitos Nativos do Tailwind:** Sombras (`shadow-*`), transições (`transition-*`) e animações (`animate-*`) utilizam as classes prontas do Tailwind em vez de CSS/keyframes manuais?
4. [ ] **daisyUI Aproveitado:** Componentes de interface (botões, cards, alertas, modais, formulários) utilizam as classes semânticas do daisyUI (`btn`, `card`, `alert`, `modal`, etc.) em vez de construções manuais do zero?
5. [ ] **Zero Cores Hardcoded:** Não há nenhum código hexadecimal (`#...`), RGB ou classe arbitrária de cor (`bg-[#...]`) no código?
6. [ ] **Suporte a Temas:** As cores de superfície e texto respeitam a semântica de temas do daisyUI (`base-100`, `base-content`, `primary`, etc.)?

