import { mdsvex } from 'mdsvex'
import { sveltePreprocess } from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'
import { fileURLToPath } from 'node:url'
import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'

const postLayout = fileURLToPath(new URL('./src/lib/PostLayout.svelte', import.meta.url))

const config: UserConfig = {
  plugins: [
    sveltekit({
      // Consult https://github.com/sveltejs/svelte-preprocess
      // for more information about preprocessors
      preprocess: [
        sveltePreprocess(),
        mdsvex({
          extensions: ['.svelte.md', '.md', '.svx'],
          smartypants: { dashes: 'oldschool' },
          layout: { posts: postLayout },
          remarkPlugins: [],
          rehypePlugins: [],
        }),
      ],
      extensions: ['.svelte', '.svelte.md', '.md', '.svx'],
      adapter: adapter({ fallback: '404.html' }),
      prerender: { crawl: true, handleMissingId: 'warn' },
    }),
  ],
  server: { port: 3000 },
}

export default config
