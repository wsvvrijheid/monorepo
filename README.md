# Wees Turborepo

<div style="display:flex;gap:30px;">
<img  height="150px" width="150px" src="https://raw.githubusercontent.com/wsvvrijheid/monorepo/main/apps/foundation/public/images/wsvvrijheid-logo.svg" />
<img  height="150px" width="150px" src="https://user-images.githubusercontent.com/4060187/196936104-5797972c-ab10-4834-bd61-0d1e5f442c9c.png" />
</div>

## What's inside?

This Turborepo includes the following packages/apps:

### Apps

- `api`: Strapi Backend
- `dashboard`: https://dashboard.freedomcombination.com
- `foundation`: https://freedomcombination.com
- `kunsthalte`: https://kunsthalte.com
- `trend-rights`: https://trendrights.com

### Packages

- `config`: `@wsvvrijheid/config` Menus, Seo, Theme, Constants
- `context`: `@wsvvrijheid/context` AuthContext
- `eslint-config-wsvvrijheid`: Eslint
- `lib`: `@wsvvrijheid/lib` Fetchers
- `mocks`: `@wsvvrijheid/mocks` Strapi Mock Data
- `stripe`: `@wsvvrijheid/stripe` Stripe
- `secrets`: `@wsvvrijheid/secrets` Secret Env Variables
- `services`: `@wsvvrijheid/services` Queries, Mutations, Fetch Functions
- `tsconfig`: Tsconfig
- `types`: `@wsvvrijheid/types` All Strapi Model Types
- `ui`: `@wsvvrijheid/ui` Components, Storybook
- `utils`: `@wsvvrijheid/utils` Utility Functions

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Postgres

You need to have a running [PostgreSQL](https://www.postgresql.org/download/) server locally on port 5432

### Start Project

```bash
yarn install
# Start all apps
yarn dev

# Start Individual App
yarn dashboard
yarn foundation
yarn kunsthalte
yarn trend-rights
yarn storybook
# The backend (api) will always be accessible via localhost:1337 for dev mode.
```

### Scripts

```bash
yarn lint # Checks lint issues
yarn clean # Deletes node_module and build folders
yarn format # Formats all files
```

### Install Packages

```bash
yarn add -W <package-name>
```
