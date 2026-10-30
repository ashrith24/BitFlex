# FileConvert

A responsive React and Vite frontend for file conversion tools. The interface
includes a landing page, tool directory, category pages, search results, and
light/dark themes. File conversion itself needs a connected processing service.

## Run the project

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Project structure

```text
src/
  components/   Shared header, footer, upload, filters, and tool cards
  data/         Tool catalog, category metadata, formats, and search matching
  pages/        One file per route or page
  App.jsx       Routes and application-wide theme state
  main.jsx      React entry point and browser router
  styles.css    Design tokens, component styles, theme styles, and breakpoints
```

## Where to make changes

- Add or edit tools in `src/data/tools.js`.
- Change page routes or the persistent theme in `src/App.jsx`.
- Update shared UI elements in `src/components/`.
- Update a route's content in its matching file in `src/pages/`.
- Adjust layout, colors, and responsive behavior in `src/styles.css`.
