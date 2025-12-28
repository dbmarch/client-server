const port = process.env.PORT || 3000
const client = process.env.CLIENT_PATH || '../my-angular-project/dist/my-angular-project/browser';

const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(client));

app.get('/healthcheck', (req, res) => {
	res.status(200).send({ message: 'healthcheck' })
})

app.get('/api', (req, res) => {
  res.json({ message: "Hello from the server!" });
})


if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, 'dist')))
	app.get('*', function(req, res) {
		res.sendFile(path.join(client, 'index.html'))
	})
}

console.log (path.join(__dirname, client, 'index.html'));

app.get(/(.*)/, (req, res, next) => {
	res.sendFile(path.join(__dirname, client, 'index.html'))
})

// The 404 Route (ALWAYS keep this as the last route)
app.use((req, res, next) => {
  res.status(404).send("Sorry, we couldn't find that page!");
});


app.listen(port, () => {
	console.log(`Resource Server Ready on port ${port}`)
})

module.exports = { app };