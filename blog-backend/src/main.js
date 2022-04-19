require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

import api from './api';
// import createFakeData from './createFakeData';
import jwtMiddleware from './lib/jwtMiddleware';

// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => {
  console.log('Connected to MongoDB');
  // createFakeData();
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
app.use(jwtMiddleware);

// apply router to app instance
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, '../../blog-frontend/build');
app.use(serve(buildDirectory));
app.use(async ctx => {
  // Not Found이고, 주소가 /api로 시작하지 않는 경우
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    // index.html 내용을 반환
    await send(ctx, 'index.html', {root: buildDirectory});
  }
});
// use 4000 if PORT is not designated
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
})