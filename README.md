# FunkoVault — Teste de autenticação com Google

Projeto de estudo para testar **AUTH/autorização via Google**, simulando um site de Funko Pop chamado **FunkoVault**. O principal ponto é permitir que o usuário **faça login com a conta Google** e, após autenticar, acesse a experiência “logada” do app.

## Stack

- React + Vite
- Node.js (ambiente de dev/build)
- Google Identity Services (GSI) no front-end

## O que foi implementado

- Login com Google (render do botão do Google na tela de login)
- Decodificação do JWT (dados básicos do usuário: nome, email, foto)
- Sessão simples no `sessionStorage` com expiração (1h)
- Logout limpando sessão + revogando e desabilitando auto-select do Google

## Como rodar localmente

### Pré-requisitos

- Node.js 18+ (recomendado)

### 1) Instalar dependências

```bash
cd Oauth
npm install
```

### 2) Client ID do Google (para rodar local / fazer fork)

Se você só vai **acessar a aplicação já publicada**, pode ignorar esta etapa.

Se você for **rodar localmente** (ou fizer um fork/deploy em outro domínio), você precisa de um **OAuth Client ID (Web)** configurado no Google Cloud e colocar o valor no código em `Oauth/src/App.jsx` (constante `GOOGLE_CLIENT_ID`).

No Google Cloud Console, ao criar uma credencial “OAuth client ID” (Web), adicione pelo menos este origin para dev:

- `http://localhost:5173`

Se você publicar em um domínio próprio, adicione também o origin do seu site (ex.: `https://seu-dominio.com`).

### 3) Rodar

```bash
npm run dev
```

Abra a URL mostrada no terminal (normalmente `http://localhost:5173`).

## Build/preview

```bash
npm run build
npm run preview
```

## Observações

- Este projeto é focado em **teste de autenticação no front-end**. Para produção, o ideal é validar tokens no backend e evitar usar apenas armazenamento/sessão do navegador como fonte de verdade.
