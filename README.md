# Office Add-in React Vite Template

This is a template for developing an [Office.JS](https://learn.microsoft.com/en-us/office/dev/add-ins/) Excel add-in with **Nx**, **Vite** and **React 18**. The main advantage of using this template is a much faster development cycle. The development server starts in just 2-3 seconds and hot-reloaded changes are near instant.

## Key differences
These are the key differences between this template and the default yeoman generated template:

- Use Nx (Integrated React)
- Use Vite instead of Webpack.
- Use React 18.
- Remove polyfills and support for IE 11.
- Enabled typescript strict mode

## Usage

To start the development server, run:

```
nx serve office-addin
```

To load the add-in in your Excel, use any of the `start` scripts. e.g:

```
nx run office-addin:start
```

To create a production build, run:

```
nx build office-addin
```

## Legacy Browsers

This template does not include support for IE11. If you need support, add [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy).
