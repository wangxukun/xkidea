import koa from 'koa';

const protocol = 'http';
const host = process.env.HOST ?? 'localhost';
// const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 80;

const app = new koa();

app.use(async (ctx) => {
  ctx.body = { message: 'Hello API' };
});
app.listen(port, host, () => {
  console.log(`[ ready ] ${protocol}://${host}:${port}`);
});
