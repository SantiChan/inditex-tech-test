# Marvel WebApp

This project has been created with `"next": "15.1.6"` and `"react":  "^19.0.0"`.

This is a [Next.js]project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Dev info

Project for Inditex to manage categories and products, fully interactive to swap products between different columns.

This project has been developed with `Next.js`, styled with `TailwindCss`, and we have used a local object for the products.

The drag-and-drop library we have used is `@dnd-kit`. More info: `https://dndkit.com/`

### Setup environment

- Install dependencies and run the development server:

```bash
    $ nvm use
    $ npm install
    $ npm run dev
```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project Folder Architecture (Components)

- `src` contains all the application source code

    - `src/components` contains all the React components used to render UI
        - `src/components/Editor` contains the main container to the Editor, we manage Zoom and row logic
        - `src/components/ContainerProduct` The product container, Alignment buttons and product placement logic.
        - `src/components/ItemProducts` Product Card to show product into Editor
    - `src/pages` contains all the page components, typically associated with routing in Next.js
        - `src/pages/index.tsx` is the main entry point of the application.
    - `src/data`: contains the local data products to show in the applicacion

    The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

### Best practices

This project uses `eslint`, `prettier` and `commitlint` to ensure good practices when programming and adding changes to the code.

It is automatically configured after running the `npm install` script.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Prod instructions

Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

```

```
