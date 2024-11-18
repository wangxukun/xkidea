import https from 'https';
import fs from 'fs';
import koa from 'koa';
import cores from 'koa2-cors';
import serve from 'koa-static';
import logger from 'koa-logger';
const xmlParser = require('koa-xml-body');
const bodyParser = require('koa-bodyparser');
require('dotenv').config();
import router from './routes';

// connection database
const db = require('./db/connect');

const protocol = 'https';
const host = process.env.EPS_GZH_APP_HOST ?? 'localhost';
const port = process.env.EPS_GZH_APP_POST
  ? Number(process.env.EPS_GZH_APP_POST)
  : 443;

const publicFiles = serve('./public');

const options = {
  key: fs.readFileSync(process.env.SSL_KEY),
  cert: fs.readFileSync(process.env.SSL_PEM),
};

// initial
const app = new koa();

// enable logger
app.use(logger());

app.use(xmlParser());
// enable bodyParser
app.use(bodyParser());

// enable cores
app.use(cores());

// enable koa-static middleware
app.use(publicFiles);

// enable routing
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
  ctx.body = { message: 'Hello API' };
});

// app.listen(port, host, () => {
//   console.log(`Listening on ${protocol}://${host}:${port}`);
// });

const server = https.createServer(options, app.callback());
server.listen(port, host, () => {
  console.log(`Listening on ${protocol}://${host}:${port}`);
});
