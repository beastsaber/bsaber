## Requirements

NodeJS >=18.19.0

## Installation

```
npm install
```

## Local Development

1. **Start the Development Server:** Use the command `npm run dev` to launch `npm run dev:frontend` and `netlify-cms` concurrently.

2. **Access the CMS:** Navigate to [http://localhost:8888/admin/index.html](http://localhost:8888/admin/index.html) in your web browser to open the Netlify CMS interface.

3. **Login:** Click on the login button. You should be granted access immediately. If prompted for a URL, enter the address of the proxy server.

### Notes

- The `npm run dev:frontend` command runs your application and integrates netlify under the `/admin/index.html` routes.
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
