# StoryHub Website

## Project overview

StoryHub is a simple website where people can publish and access previously published content. To access the information, you must first log into the system. Users who do not have an account can sign up and log in with their email address and password. Once authenticated, the user can read posts made by other users and publish their own. The user can narrow down the posts they want to read by category. They could also filter the posts so that they can see all of the posts by a particular author in a single display.

This project gave me the opportunity to hone both my front end and backend skills. React, Redux, React persistence, Tailwind, and Sass are the frontend technologies used in the project. The front end is currently in active development on Vercel and Netlify. The project's backend technologies include Node, Express, Mongoose, JWT tokens, and MongoDB Atlas for cloud data storage. The backend is fully active on Heroku servers. I relied heavily on Postman for API testing throughout the project.

## How to use the website

Before you can read or publish any post, you must first be authenticated. If you try to read a post without being authenticated, you will be directed to a sign in form where you must enter your email address and password.

If you are new to the website and do not yet have an account, a link to a sign up form is available. Once authenticated, you are redirected to the home page, where you have read access to other users' posts. Users can also publish their own posts, which will grant them read and write access.

If you want to log out of the system, there is a logout button available.
