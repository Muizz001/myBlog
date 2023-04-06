This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Register or Login

To register go to `http://localhost:3000/register` and `http://localhost:3000/login` to login also. You will be asked to login or register with email, username and password and then redirected to the home page

## Homepage

The home page consists of all the previous blog posts and a navbar that's globally available in the app with a functioning searchbar and links to the createpost page and a logout or login link and the current user's username  

## Postpage

The post page can be accessed by clicking on the post title on the homepage or the read more button and then be redirected to the `post/[id]` page containing the ID of the post. The post page also has a fully functioning delete and edit post buttons thta can be used by the author of the post or the admin and a fully functioning comment section that allows logged in users to post comments and non-logged in users to view comments alone.

## CreatePostpage

The create post page can be accessed by going to `http://localhost:3000/write` or by clicking on the write button on the navbar. It uses react quill as a text editor and allows users to ad post title, content and an optional picture. On publishing the author is returned back to the HomePage.

## Backend

This whole app is powered by firebase from authentication to the database.
