# Ignite Timer — Pomodoro

> Aplicação web para gerenciamento de foco utilizando a técnica Pomodoro, com controle de ciclos, contagem regressiva em tempo real e histórico de tarefas.

---

## 🚀 Visão Geral

O **Ignite Timer** permite que o usuário defina uma tarefa e uma duração (de 5 a 60 minutos) e inicie um temporizador de contagem regressiva. Ao final de cada ciclo, o status é atualizado automaticamente. Todos os ciclos ficam registrados no histórico, mesmo após recarregar a página.

- **Público-alvo:** Qualquer pessoa que queira aplicar a técnica Pomodoro para organizar blocos de trabalho focado.
- **Problema resolvido:** Centraliza o controle de tempo e o histórico de sessões de produtividade em uma interface simples e responsiva.
- **Principal diferencial:** Estado persistido via `localStorage` — os ciclos e o timer ativo são restaurados automaticamente ao reabrir o navegador.

---

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia |
|---|---|
| Frontend | React 18, TypeScript |
| Build | Vite |
| Estilização | Styled Components |
| Roteamento | React Router DOM v6 |
| Formulários | React Hook Form + Zod |
| Datas | date-fns |
| Estado imutável | Immer |
| Ícones | Phosphor React |
| Linting | ESLint (config Rocketseat) |

---

## 🎯 Principais Funcionalidades

- **Novo ciclo:** Criação de tarefa com nome e duração configurável (mínimo 5 min, máximo 60 min, passo de 5 em 5).
- **Contagem regressiva:** Timer em tempo real exibido em formato `MM:SS` com atualização a cada segundo.
- **Título dinâmico:** O título da aba do navegador exibe o tempo restante enquanto o ciclo está ativo.
- **Interrupção:** Ciclo ativo pode ser interrompido manualmente a qualquer momento.
- **Conclusão automática:** Ao atingir zero, o ciclo é marcado como concluído automaticamente.
- **Histórico:** Página dedicada listando todos os ciclos com nome da tarefa e duração.
- **Persistência local:** Estado completo (ciclos e timer ativo) salvo no `localStorage` — sobrevive ao reload da página.
- **Tema escuro:** Paleta de cores consistente via Styled Components com tema centralizado.

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura baseada em **Context API + useReducer**, com separação clara entre estado, lógica e apresentação:

- **CyclesContext** centraliza todo o estado de ciclos e expõe as ações para os componentes.
- **cyclesReducer** processa as ações (`ADD_NEW_CYCLE`, `INTERRUPT_CURRENT_CYCLE`, `MARK_CURRENT_CYCLE_AS_FINISHED`) usando **Immer** para atualizações imutáveis.
- **Formulário** validado com **React Hook Form** e esquema **Zod**, garantindo que task e minutesAmount estejam dentro das regras antes de disparar qualquer ação.
- **Roteamento** com React Router DOM v6 usando um `DefaultLayout` com `<Outlet>` para compartilhar o Header entre as páginas.

Fluxo principal:

    Usuário preenche tarefa + duração
          ↓
    React Hook Form valida com Zod
          ↓
    Dispatch: ADD_NEW_CYCLE → CyclesReducer (Immer)
          ↓
    Countdown lê activeCycle via Context e inicia setInterval
          ↓
    Dispatch: MARK_CURRENT_CYCLE_AS_FINISHED (ou INTERRUPT)
          ↓
    useEffect persiste estado no localStorage

---

## 📂 Estrutura do Projeto

    src/
    ├── @types/             # Declarações de tipos TypeScript (tema Styled Components)
    ├── assets/             # Ícone e logo da aplicação
    ├── components/
    │   └── Header/         # Navegação entre Timer e Histórico
    ├── contexts/
    │   └── CyclesContext   # Estado global e ações dos ciclos
    ├── layouts/
    │   └── DefaultLayout/  # Layout base com Header e Outlet
    ├── pages/
    │   ├── Home/           # Página principal com formulário e contador
    │   │   └── components/
    │   │       ├── Countdown/      # Exibição do timer MM:SS
    │   │       └── NewCycleForm/   # Formulário de criação de ciclo
    │   └── History/        # Tabela com todos os ciclos realizados
    ├── reducers/
    │   └── cycles/
    │       ├── actions.ts  # Action creators tipados
    │       └── reducer.ts  # Reducer com Immer
    ├── styles/
    │   ├── global.ts       # Estilos globais
    │   └── themes/
    │       └── default.ts  # Paleta de cores centralizada
    ├── App.tsx             # Providers: BrowserRouter, ThemeProvider, CyclesContextProvider
    ├── Router.tsx          # Definição de rotas
    └── main.tsx            # Entry point

---

## ⚙️ Como Executar

### Pré-requisitos

- Node.js 18 ou superior
- npm (incluso com o Node.js)

### Instalação

    git clone https://github.com/JulioAmaral007/CountdownTimer.git
    cd CountdownTimer
    npm install

### Execução em desenvolvimento

    npm run dev

Acesse em: `http://localhost:5173`

### Build para produção

    npm run build
    npm run preview

---

## 🗄️ Persistência de Dados

O projeto não utiliza banco de dados externo. O estado é salvo inteiramente no **localStorage** do navegador sob a chave:

    @countdown-timer:cycles-state-1.0.0

Dados persistidos:

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | Identificador único do ciclo (timestamp) |
| `task` | string | Nome da tarefa |
| `minutesAmount` | number | Duração configurada (5–60 min) |
| `startDate` | Date | Data/hora de início |
| `interruptedDate` | Date? | Preenchido ao interromper |
| `finishedDate` | Date? | Preenchido ao concluir |

---

## 🔒 Validações

- **task:** Campo obrigatório (mínimo 1 caractere).
- **minutesAmount:** Número entre 5 e 60, múltiplo de 5.
- Validação declarativa via esquema **Zod** integrado ao **React Hook Form** — o botão "Começar" fica desabilitado enquanto o campo de tarefa estiver vazio.
- Campos do formulário ficam desabilitados enquanto um ciclo está ativo, evitando conflitos de estado.

---

## 📈 Melhorias Futuras

- Exibir status visual do ciclo no histórico (concluído, interrompido ou em andamento).
- Notificação sonora ao finalizar o ciclo.
- Sincronização de estado com backend ou banco de dados na nuvem.
- Configuração de ciclos curtos e longos (pausa Pomodoro padrão).
- PWA com suporte offline.

---

## 📚 Contexto

Projeto desenvolvido durante o curso **ReactJS Ignite** da [Rocketseat](https://www.rocketseat.com.br/), com foco em:

- Gerenciamento de estado com Context API e `useReducer`
- Atualizações imutáveis com **Immer**
- Validação de formulários com **React Hook Form** + **Zod**
- Estilização com **Styled Components** e temas tipados
- Roteamento com **React Router DOM v6**
- Persistência de dados com `localStorage`

---

## 👨‍💻 Desenvolvedor

**Desenvolvido por:**

- [Júlio Cézar](https://github.com/JulioAmaral007)

---

Feito com foco e dedicação durante o Ignite ReactJS da Rocketseat.
