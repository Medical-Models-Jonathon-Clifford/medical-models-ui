# Medical Models User Interface

Next.js service for the frontend of the medical models application.

If you're interested in the architecture of Medical Models at a high level. Look here - [medical-models-system-documentation](https://github.com/Medical-Models-Jonathon-Clifford/medical-models-system-documentation). You'll find system diagrams, descriptions and only one UML diagram!

If you want to see the other services, find them here:

| Service                                       | Repo                                                                                                 |
|-----------------------------------------------|------------------------------------------------------------------------------------------------------|
| Medical Models Service                        | [medical-models-service](https://github.com/Medical-Models-Jonathon-Clifford/medical-models-service) |
| Medical Models OAuth 2.0 Authorization Server | [medical-models-authorization-server](https://github.com/Medical-Models-Jonathon-Clifford/medical-models-authorization-server)          |


## Local Setup

1. Install Node.js v20. Find installation steps for your system here - https://nodejs.org/en/download
2. Clone this repo. For example, to clone using ssh:
```bash
git clone git@github.com:Medical-Models-Jonathon-Clifford/medical-models-ui.git
``` 
3. Navigate into the project directory.
```bash
cd medical-models-ui
```
4. Install nx globally.
```bash
npm install -g nx@19.5.7
```
5. Install npm dependencies.
```bash
npm install
```
6. Run medical-models-ui with the development server.
```bash
nx run medical-models:dev
```
7. Start the medical-models-authorization-server by following its instructions here -  https://github.com/Medical-Models-Jonathon-Clifford/medical-models-authorization-server
8. Start the medical-models-service by following its instructions here -  https://github.com/Medical-Models-Jonathon-Clifford/medical-models-service
9. Navigate to http://localhost:3000 to view the application.

## Local Development

1. Run medical-models-ui with the Next.js development server.
```bash
nx run medical-models:dev
```
2. Any code change you make should live reload. Sometimes more extensive changes need a browser refresh. Installing new dependencies will require you to stop and start the development server.

## Tooling

| Tool              | Notes                                                                                                                                          | Docs                                 |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------|
| Javascript        | When programming on the web, there is no avoiding Javascript.                                                                                  | https://developer.mozilla.org/en-US/docs/Web/JavaScript |
| Typescript        | Typescript brings some compile time type safety to Javascript. Can increase the maintainability of larger Javascript projects.                 | https://www.typescriptlang.org/ |
| React             | Industry standard library for building user interfaces on the web. Plenty of well-supported libraries for most tasks.                          | https://react.dev/reference/react |
| Next.js           | Robust React web framework. Supports Server-side rendering.                                                                                    | https://nextjs.org/docs |
| React Material UI | Popular React component library.                                                                                                               | https://mui.com/material-ui/getting-started/ |
| Axios             | Popular isomorphic Javascript web client.                                                                                                      | https://axios-http.com/docs/intro |
| Jest              | Standard Javascript unit testing library.                                                                                                      | https://jestjs.io/docs/getting-started |
| Prettier          | An opinionated Javascript code formatter. Automatically fixes most code style issues.                                                          | https://prettier.io/docs/ |
| ESLint            | Javascript linter. Catches additional code style violations on top of prettier.                                                                | https://eslint.org/docs/latest/ |
| SCSS              | Superset of CSS that aids the maintainability of stylesheets as projects grow larger.                                                          | https://sass-lang.com/documentation/ |
| Auth.js           | Handles OAuth 2.0 authentication.                                                                                                              | https://authjs.dev/getting-started |
| Chart.js          | Simple Javascript charting library.                                                                                                            | https://www.chartjs.org/docs/latest/ |
| Nx                | Creates a dependency graph between sub-components of a project. Keeps the build fast as a project grows by only rebuilding updated components. | https://nx.dev/getting-started/intro |
