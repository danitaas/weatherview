
### WebStorm

You would need to have [WebStorm](https://www.jetbrains.com/webstorm/) and [JetBrains IDE Support](https://chrome.google.com/webstore/detail/jetbrains-ide-support/hmhgeddbohgjknpmjagkdomcpobmllji) Chrome extension installed.

In the WebStorm menu `Run` select `Edit Configurations...`. Then click `+` and select `JavaScript Debug`. Paste `http://localhost:3000` into the URL field and save the configuration.

>Note: the URL may be different if you've made adjustments via the [HOST or PORT environment variables](#advanced-configuration).

Start your app by running `npm start`, then press `^D` on macOS or `F9` on Windows and Linux or click the green debug icon to start debugging in WebStorm.


## Advanced Configuration

You can adjust various development and production settings by setting environment variables in your shell or with [.env](#adding-development-environment-variables-in-env).

Variable | Development | Production | Usage
:--- | :---: | :---: | :---
BROWSER | :white_check_mark: | :x: | By default, Create React App will open the default system browser, favoring Chrome on macOS. Specify a [browser](https://github.com/sindresorhus/opn#app) to override this behavior, or set it to `none` to disable it completely. If you need to customize the way the browser is launched, you can specify a node script instead. Any arguments passed to `npm start` will also be passed to this script, and the url where your app is served will be the last argument. Your script's file name must have the `.js` extension.
HOST | :white_check_mark: | :x: | By default, the development web server binds to `localhost`. You may use this variable to specify a different host.
PORT | :white_check_mark: | :x: | By default, the development web server will attempt to listen on port 3000 or prompt you to attempt the next available port. You may use this variable to specify a different port.
HTTPS | :white_check_mark: | :x: | When set to `true`, Create React App will run the development server in `https` mode.
PUBLIC_URL | :x: | :white_check_mark: | Create React App assumes your application is hosted at the serving web server's root or a subpath as specified in [`package.json` (`homepage`)](#building-for-relative-paths). Normally, Create React App ignores the hostname. You may use this variable to force assets to be referenced verbatim to the url you provide (hostname included). This may be particularly useful when using a CDN to host your application.
CI | :large_orange_diamond: | :white_check_mark: | When set to `true`, Create React App treats warnings as failures in the build. It also makes the test runner non-watching. Most CIs set this flag by default.
REACT_EDITOR | :white_check_mark: | :x: | When an app crashes in development, you will see an error overlay with clickable stack trace. When you click on it, Create React App will try to determine the editor you are using based on currently running processes, and open the relevant source file. You can [send a pull request to detect your editor of choice](https://github.com/facebookincubator/create-react-app/issues/2636). Setting this environment variable overrides the automatic detection. If you do it, make sure your systems [PATH](https://en.wikipedia.org/wiki/PATH_(variable)) environment variable points to your editor’s bin folder. You can also set it to `none` to disable it completely.
CHOKIDAR_USEPOLLING | :white_check_mark: | :x: | When set to `true`, the watcher runs in polling mode, as necessary inside a VM. Use this option if `npm start` isn't detecting changes.
GENERATE_SOURCEMAP | :x: | :white_check_mark: | When set to `false`, source maps are not generated for a production build. This solves OOM issues on some smaller machines.
NODE_PATH | :white_check_mark: |  :white_check_mark: | Same as [`NODE_PATH` in Node.js](https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders), but only relative folders are allowed. Can be handy for emulating a monorepo setup by setting `NODE_PATH=src`.

