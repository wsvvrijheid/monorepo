module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-wsvvrijheid`
  extends: ['wsvvrijheid'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}
