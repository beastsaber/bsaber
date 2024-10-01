## Requirements

NodeJS >=18.19.0

## Installation

Before you proceed to the local development steps, you should install the dependencies. npm is bundled with node - which you will also need for running this project.

```bash
npm install
```

## Local Development

**Start the Development Server:** Use the command `npm run dev` to launch `npm run dev:frontend` and `decap-server` concurrently.

### Previewing the Website

You can now navigate to http://localhost:3000 to see a local preview of the website including your changes. The port may change when 3000 is taken - so check the console for any hint of that.

### Accessing the CMS

1. **Access the CMS:** Navigate to [http://localhost:3000/cms/admin/index.html](http://localhost:3000/cms/admin/index.html) in your web browser to open the Decap CMS interface.

2. **Login:** Click on the login button. You should be granted access immediately. If prompted for a URL, enter the address of the proxy server - this shouldn't usually happen though.

### Additional Background Information on the Setup

- The `npm run dev:frontend` command runs your application and integrates Decap under the `/cms/admin/index.html` routes.
- The CMS proxy server enables the use of the local strategy for content management, directly saving files to the local file system.

## Short File Tree Description

```txt
.
├── environmentVariables.ts.template // Template file to inject .env variables. Will be filled with envsubst in the build step. See "Building Details" for more info.
├── migration-from-bsaber.com // Scripts used to transfer MotW from the old page - can be ignored
├── README.md
├── src
│   ├── app.html // Entry point for the application - contains placeholder for special tags such as <svelte:head> as well
│   ├── app.scss // Global styles
│   ├── collections // Actual data for the collection per their model definiton. One folder = one collection
│   ├── lib // Components and functions that can be accessed with the $lib path
│   ├── maps.ts // Central point for constants that encode shared mappings of all kinds
│   ├── routes // Svelte(kit) routing - these are the pages of our website. See the "Project Routing" section for more details
│   │   ├── 404.svelte
│   ├── scss // Styles that are shared across multiple components
│   │   └── variables.scss // Defines a preset of colors and values to be used uniformly across the project - need a color? Import from here!
│   └── types.ts // A central place for types - if types are specific for a component (or similar) and not shared across the project, put them in the respective component file
├── static // These files will be mounted on the root. For example, ./static/example.jpg will later be accessible under https://bsaber.com/example.jpg
│   ├── admin
│   │   ├── config.yml // This file defines the config and data model for Decap CMS - if you want to edit, add or remove a collection some changes will happen here
│   │   └── index.html // Entry point for the Decap CMS page for admins
│   ├── characteristics // Folder containing the images for the diffs on the map cards
│   ├── favicon.png // This file is the favicon of the website
│   ├── uploads // Directory that contains uploaded images from Decap CMS
├── svelte.config.js // Svelte(kit) configuration - contains the configurations for crawling and SSG as well
├── update-cover-url-overwrites.sh // See "Utility Scripts" for info
```

## Project Routing

The routes are determined by file path starting at `src/routes`. For example, [`src/routes/community-hub/+page.svelte`](src/routes/community-hub/+page.svelte) renders under [https://bsaber.com/community-hub](https://bsaber.com/community-hub) or in the local development environment under [http://localhost:3000/community-hub](http://localhost:3000/community-hub).

Note the following when it comes to those:

1. **We statically generate our site**: You cannot rely on server side routing to dynamically update the pages. These only execute once when rendering and generating the static HTML and CSS files and cannot react to, for example, a change in the file system. Creating and managing files will thus also not usually make sense.

2. **Pages with path parameters need to be linked**: Paths that contain path parameters such as `[page]` need to be linked to somewhere from another page that either has no path parameter or is linked by a page fulfilling these conditions. Basically, they need to be crawlable by following links. If a page cannot be crawled starting from any non-parameter path it will simply exist in the final product.

3. **`npm run dev` ≠ Production Environment**: You cannot rely on it 100%. For example, non-rendered pages will still work with `npm run dev` since it actually executes server-side.

4. **You usually want to stick to `+page.server.ts` not `+page.ts`**: The difference between the two is that the `.server.ts` only executes server side (so once when rendering). The `+page.ts` will run server and client side. Due to the way we use server-side code it usually doesn't make sense to use `+page.ts` and can quickly result in confusing errors.

5. **API functionality won't get you far**: Svelte allows you to define an API on the server side. This will also work only very limitedly. At the very least the dynamic nature of it will be stripped away.

## Contributing

We are available for question, support and discussion on our [Discord server](https://discord.gg/5VaEjFeuny).

We would hate for you to spend valuable time on something that we end up not using. Here is some information on how to increase the likelihood of us merging your changes:

- You can find tasks that are planned but not in active development as [approved, but non-assigned issues](https://github.com/beastsaber/bsaber/issues?q=is%3Aopen+is%3Aissue+label%3Aapproved+no%3Aassignee). Do watch the labels!

- If you are unsure if you can work on a task or what it entails: Do contact us. Either comment on the issue or drop by on the Discord. We are happy to answer your questions and concerns.

- Make us aware that you'd like to work on the issue. We'll assign it to you and avoid the work being done twice!

## Making a Pull Request?

When you are about to make a pull request please check that the linter throws no error and do run it if you haven't. Also, check whether the preview - which will be created with a pull request - is rendered properly.

We will see your PR - feel free to poke us if it has gone unreviewed for more than a week though!
