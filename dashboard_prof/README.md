# Dashboard de Comissões (profissional) – React + Node + SQLite

Este projeto já está pronto para subir no **Render** com uma aparência premium (Tailwind + animações), login por **cookie HTTPOnly** e dados persistidos em **SQLite**.

## Rodar local

1) Instale dependências:

```bash
npm install
```

2) Suba o servidor (API + site):

```bash
npm start
```

Abra: `http://localhost:3000`

> Em desenvolvimento, você também pode rodar o client separado com `npm --workspace client run dev` (proxy de `/api` já configurado).

## Login

- Admin padrão (apenas para primeiro start):
  - usuário: `admin`
  - senha: `admin`

No Render, **mude obrigatoriamente**:
- `ADMIN_PASSWORD`
- `SESSION_SECRET`

## Fluxo recomendado

1) Entre como **admin**.
2) Vá em **Configurações → Consultores**.
3) Crie consultores.
4) Para cada consultor, clique em **Criar login** e defina usuário/senha.
5) Cadastre vendas na aba **Vendas**.

## Variáveis de ambiente (Render)

No serviço Web, configure:
- `NODE_ENV=production`
- `SESSION_SECRET=<um segredo grande>`
- `ADMIN_USER=admin` (opcional)
- `ADMIN_PASSWORD=<sua senha>`

## Build no Render

- Build command:
  - `npm run build`
- Start command:
  - `npm start`

