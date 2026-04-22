import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project Pages URL: https://<user>.github.io/<repo>/
// `base: "./"` produces ./assets/... which breaks when the site is opened without a
// trailing slash. CI sets VITE_BASE=/repo/ so script tags are absolute from the host root.
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'camden-capitals'
const base =
  process.env.VITE_BASE?.trim() ||
  (process.env.GITHUB_ACTIONS === 'true' ? `/${repo}/` : '/')

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
