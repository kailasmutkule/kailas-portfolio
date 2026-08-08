# Kailas Mutkule Portfolio

A simple, responsive portfolio using:

- React
- Node.js
- Express.js
- MongoDB / Mongoose
- Bootstrap 5
- Custom CSS

No Vite, no complicated build setup.

## 1. Install

Make sure Node.js is installed.

```bash
npm install
```

## 2. Add MongoDB

Create a MongoDB Atlas database and copy its connection string.

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/kailas_portfolio
```

## 3. Run

```bash
npm start
```

Open:

http://localhost:5000

## Contact form

The contact form sends POST requests to:

`/api/contact`

Messages are saved in MongoDB.

The email and phone buttons use `mailto:` and `tel:` so visitors can contact Kailas directly.

## Before deployment

Replace the `#` GitHub/Live links in `client/app.js` with your real project URLs.

Also add your GitHub and LinkedIn links if you want them in the contact/social area.

## Deploy quickly

This project is designed to be deployed as one Node/Express service.

On a hosting service such as Render:

- Build command: `npm install`
- Start command: `npm start`
- Add environment variable: `MONGODB_URI`

The server serves the React frontend and the API from the same service.
