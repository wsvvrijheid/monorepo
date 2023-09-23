const isDevMode = process.env['CI']
type platform =
  | 'wsvvrijheid'
  | 'samenvvv'
  | 'kunsthalte'
  | 'lotus'
  | 'dashboard'
export const getVercelUrl = (platform: platform) => {
  if (isDevMode) {
    switch (platform) {
      case 'dashboard':
        return 'http://localhost:3000/'
      case 'wsvvrijheid':
        return 'http://localhost:3001/'
      case 'kunsthalte':
        return 'http://localhost:3002/'
      case 'lotus':
        return 'http://localhost:3003/'
      case 'samenvvv':
        return 'http://localhost:3004/'
    }
  }

  return `https://${platform}-git-dev-wsvvrijheid.vercel.app/`
}
