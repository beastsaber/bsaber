## Requirements

NodeJS >=16.18.1

## Installation

```
npm install
```

## Local Development

1. **Start the Development Server:** Use the command `npx netlify dev` to launch the development server. This server reads the netlify.toml configuration.

2. **Launch Netlify CMS Proxy Server:** Execute `npm run netlify-cms` to start the Netlify CMS proxy server. This allows for local content management via the disk instead of git (as it would be the case in production).

3. **Access the CMS:** Navigate to [http://localhost:8888/admin/](http://localhost:8888/admin/) in your web browser to open the Netlify CMS interface.

4. **Login:** Click on the login button. You should be granted access immediately. If prompted for a URL, enter the address of the proxy server.

### Notes
- The `netlify dev` command runs your application and automatically configures the server to use the port specified in the TOML file. It effectively routes requests to your application while injecting the `/admin/` endpoint for CMS access.
- The CMS proxy server enables the use of the local strategy for content management, directly saving files to the local file system.


## Contributing

### Before submitting a PR

Verify that the app can be built:

```
npm run build
```

Run prettier formatter:

```
npm run format
```
