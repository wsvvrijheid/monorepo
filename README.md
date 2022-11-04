# Wsvvrijheid Monorepo

<img style="text-align: center;" src="https://api.samenvvv.nl/uploads/wsvvrijheid_logo_4dc0f4ce82.svg" width="150" />

This project was generated using [Nx](https://nx.dev).

<img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="150" />

🔎 **Smart, Fast and Extensible Build System**

## Projects

- Foundation [wsvvrijheid.nl](https://wsvvrijheid.nl)
- Kunsthalte [kunsthalte.com](https://kunsthalte.com)
- PostMaker [samenvvv.nl](https://samenvvv.nl)
- Admin [dashboard.wsvvrijheid.nl](https://dashboard.wsvvrijheid.nl)

# Libs

- Config (@wsvvrijheid/config)
- Lib (@wsvvrijheid/lib)
- Mocks (@wsvvrijheid/mocks)
- Services (@wsvvrijheid/services)
- Store (@wsvvrijheid/store)
- Types (@wsvvrijheid/types)
- UI (@wsvvrijheid/ui) [ui.wsvvrijheid.nl](https://ui.wsvvrijheid.nl)
- Utils (@wsvvrijheid/utils)

## Scripts

Install packages `yarn`

Install api packages `yarn install:api`

Prepare db: `yarn db` _(you need .env and database.dump.sql)_

Start api: `yarn api`

Start storybook: `yarn storybook`

Start apps `yarn foundation|kunsthalte|admin|samenvvv`

## Recommended VSCode Plugins

- [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console)

## Environement Variables

```
NX_API_URL=https://api.samenvvv.nl
NX_VERCEL_URL=http://localhost:4200
NX_API_TOKEN=
NX_EMAIL_SENDER=
NX_EMAIL_RECEIVER=
NX_SECRET_COOKIE_PASSWORD
```

API env

```
# Strapi
HOST=0.0.0.0
PORT=1337
ADMIN_JWT_SECRET=
APP_KEYS=
JWT_SECRET=
API_TOKEN_SALT=

# Plugins
BEARER_TOKEN=
SMTP_USERNAME=info@wsvvrijheid.nl
SMTP_PASSWORD=
ENABLE_LOCAL_CRON=false

# Database
DATABASE_URL=postgres://samen_user:Samen123@localhost/samen_api
DATABASE_USERNAMe=samen_user
DATABASE_PASSWORD=Samen123
DATABASE_NAME=samen_api
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_CLIENT=postgres

NODE_ENV=development
```
