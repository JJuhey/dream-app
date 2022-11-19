export const API_KEY = process.env.REACT_APP_API_KEY
export const AUTH_DOMAIN = process.env.REACT_APP_AUTH_DOMAIN

export const NOTION_TOKEN = process.env.REACT_APP_NOTION_TOKEN
export const NOTION_DATABASE = process.env.REACT_APP_NOTION_DATABASE
export const NOTION_DATABASE_URL = 'https://api.notion.com/v1/databases'
export const NOTION_BASE_URL = (process.env.NODE_ENV === 'development') ? `https://cors-anywhere.herokuapp.com/${NOTION_DATABASE_URL}` : `${NOTION_DATABASE_URL}`
