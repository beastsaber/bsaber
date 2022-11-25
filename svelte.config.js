import { mdsvex } from 'mdsvex'
import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess(),
    mdsvex({
      extensions: ['.svelte.md', '.md', '.svx'],
      smartypants: {
        dashes: 'oldschool',
      },
      layout: {
        posts: './src/routes/+layout.svelte',
      },
      remarkPlugins: [],
      rehypePlugins: [],
    }),
  ],

  kit: {
    adapter: adapter({}),

    prerender: {
      crawl: true,
    },

    // Content-Security-Policy Configuration
    // csp: {
    //   mode: 'auto',
    //   directives: {
    //     'default-src': ['self', 'https://api.bsaber.com/'],
    //     'script-src': [''],
    //     'style-src': ['self'],
    //     'img-src': ['self', 'https://cdn.scoresaber.com/avatars/', 'data:'],
    //     'upgrade-insecure-requests': true,
    //     'frame-ancestors': ['self', 'https://questmodding.com'],
    //     'object-src': ['none'],
    //     'base-uri': ['self'],
    //     'connect-src': ['self', 'https://api.bsaber.com/', 'https://api.beatsaver.com'],
    //   },
    // },
  },
  extensions: ['.svelte', '.svelte.md', '.md', '.svx'],
}

export default config
