import cookie from "cookie"

import DatabaseConfig from "../../types/DatabaseConfig"

export const CONFIG_COOKIE = "manageh-config"

export const serializeCookie = (config: DatabaseConfig) => {
  return cookie.serialize(CONFIG_COOKIE, JSON.stringify(config), {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })
}

export const getCookie = (value: string, key: string) => {
  const cookies = cookie.parse(value)
  return cookies[key] || null
}
