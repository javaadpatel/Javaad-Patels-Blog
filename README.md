# Javaad Patel's Blog

This repository contains the source code for the blog hosted at https://javaadpatel.com. The blog is based off a [Gatsby.js](https://www.gatsbyjs.org/) template and powered by [Ghost](https://ghost.org/), a headless content management system.

Blog Preview:

![Javaad Patel's Blog Preview](./resources/javaad-patel-blog.png)

### Instructions for publishing new post

-   Start Ghost instance using `ghost stop && ghost start`
-   Start Gatsby blog using `npm run start`
-   Navigate to ghost portal http://localhost:2784/ghost/ (port depends on ghost configuration)
-   Publish article
-   Open port with ngrok using `ngrok http 2784`
-   Change url in .ghost.json file, production.apiUrl
-   Push to GitHub
