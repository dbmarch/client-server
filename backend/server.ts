import express from 'express';
import cors from 'cors';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {router as routes}  from './routes/index.ts';
import { openDatabase, closeDatabase } from './services/mongoose.ts';

const port = process.env.PORT || 3000
const client = process.env.CLIENT_PATH || '../my-angular-project/dist/my-angular-project/browser';

try {
  await openDatabase();
} catch(err) {
  console.error('unable to open database');
}

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/healthcheck', (req , res ) => {
	res.status(200).send({ message: 'healthcheck' })
})

// install our custom routes
app.use ('/api', routes);

// Serve the front end static files
app.use(express.static(client));
app.get(/(.*)/, (req, res, next) => {
   console.log ("Redirect /index.html")
   res.redirect('/');
})

// The 404 Route (ALWAYS keep this as the last route)
app.use((req, res, next) => {
  res.status(404).send("Page Not Found!");
});

app.listen(port, () => {
  console.log(`Resource Server Ready on port ${port}`)
})

process.on('SIGINT', () => {
  console.log('Received SIGINT signal. Performing graceful shutdown...');
  // Perform asynchronous cleanup tasks here (e.g., close database connections, stop server)
  cleanupAsync()
    .then(() => {
      console.log('Cleanup complete. Exiting.');
      process.exit(0); // Exit once cleanup is done
    })
    .catch((err) => {
      console.error('Error during cleanup:', err);
      process.exit(1); // Exit with an error code if cleanup fails
    });
});

async function cleanupAsync() {
  return await closeDatabase();
}

console.log('App running. Press Ctrl+C to trigger shutdown.');

export { app };