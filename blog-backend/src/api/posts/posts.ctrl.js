/*
POST /api/posts
{
  title: 'title',
  body: '내용',
  tags: ['tag1','tag2']
}
*/

import Post from '../../models/post';

export const write = async ctx => {
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags
  })
  try{
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const list = ctx => {};

export const read = ctx => {};

export const remove = ctx => {};

export const update = ctx => {};