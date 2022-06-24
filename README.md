# Academy Ruins

Magic: the Gathering Knowledge Portal

## About

Academy Ruins is a site that displays information about rules resources for Magic: the Gathering. Specifically, it hosts an archive of old versions of the Comprehensive Rules, the Magic Tournament Rules, and the Infraction Procedure Guide. It also provides incremental diffs for those documents.

This repository hosts only the code for the front-end web-app part of Academy Ruins. The API that serves it the required data is hosted under [lunakv/academyruins-api](https://github.com/lunakv/academyruins-api).

## Setup

### Prerequisites
- Node 16+

### Installation and Start
1. Clone and configure a local [API installation](https://github.com/lunakv/academyruins-api/#Setup).
2. If your API isn't running on `localhost:8000`, create an `.env.local` file overriding the `REACT_APP_API_URL` variable.
3. `npm install`
4. `npm start`

Your site will be started in development mode at `localhost:3000`

### Production Build
1. Create an `.env.production.local` file overriding `REACT_APP_API_URL` to point to the production API.
2. `npm run build`.

The optimized build files will be created inside the `build` folder, which you can upload to any static hosting provider. 

*Note:* the site is a single-page app that uses React Router for navigation, so your file server must be able to redirect URLs without corresponding files (e.g. `/about`) to `/index.html`, otherwise reloading anywhere besides the home-page will result in a 404 error. 
