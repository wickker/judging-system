import Config from "$lib/configs"
import { ROUTES } from "./routes"

export const COOKIES = {
	ADMIN: 'admin',
} as const

export const COOKIE_CONFIGS = {
  ADMIN: {
    path: ROUTES.HOME, // send cookie for every page
    httpOnly: true, // server side only cookie so you can't use `document.cookie`
    // only requests from same site can send cookies
    // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
    sameSite: 'strict',
    secure: Config.PROD, // only sent over HTTPS in production
    maxAge: 60 * 60 * 24, // set cookie to expire after a month
  }
} as const