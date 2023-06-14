# Wees Turborepo

<div style="display:flex">
<img src="https://user-images.githubusercontent.com/4060187/196936104-5797972c-ab10-4834-bd61-0d1e5f442c9c.png" height="150px" width="150px" />
<img style="margin-left:30px" height="150px" width="150px" src="https://api.wsvvrijheid.nl/uploads/wsvvrijheid_3916828b44.svg" />
</div>

## What's inside?

This Turborepo includes the following packages/apps:

### Apps

- `api`: Strapi Backend
- `dashboard`: https://dashboard.wsvvrijheid.nl
- `foundation`: https://wsvvrijheid.nl
- `kunsthalte`: https://kunsthalte.com
- `samenvvv`: https://samenvvv.nl

### Packages

- `config`: `@wsvvrijheid/config` Menus, Seo, Theme, Constants
- `context`: `@wsvvrijheid/context` AuthContext
- `eslint-config-wsvvrijheid`: Eslint
- `lib`: `@wsvvrijheid/lib` Fetchers
- `mocks`: `@wsvvrijheid/mocks` Strapi Mock Data
- `mollie`: `@wsvvrijheid/mollie` Mollie Client
- `secrets`: `@wsvvrijheid/secrets` Secret Env Variables
- `services`: `@wsvvrijheid/services` Queries, Mutations, Fetch Functions
- `tsconfig`: Tsconfig
- `types`: `@wsvvrijheid/types` All Strapi Model Types
- `ui`: `@wsvvrijheid/ui` Components, Storybook
- `utils`: `@wsvvrijheid/utils` Utility Functions

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Start Project

```bash
yarn install
# Start all apps
yarn dev

# Start Individual App
yarn dashboard
yarn foundation
yarn kunsthalte
yarn samenvvv
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
