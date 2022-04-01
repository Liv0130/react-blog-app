require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const api = require('./api');

// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(e => {
  console.error(e);
});

const app = new Koa();
const router = new Router();

// router setting
router.use('/api', api.routes()); // api route


// apply bodyParser before using router
app.use(bodyParser());

// apply router to app instance
app.use(router.routes()).use(router.allowedMethods());

// use 4000 if PORT is not designated
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listenig to port %d', port);
})