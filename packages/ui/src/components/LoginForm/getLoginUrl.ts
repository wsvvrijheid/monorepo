
export const getLoginUrl = ({ pathname }: { pathname: string }) =>
    `/login?returnUrl=${encodeURIComponent(pathname)}`
