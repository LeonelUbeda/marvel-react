import { rest } from 'msw';
import { comicDetail, comicsListing } from './data/comicsData';

export default [
  rest.get('https://gateway.marvel.com/v1/public/comics/1', (req, res, ctx) =>
    res(ctx.json(comicDetail))
  ),
  rest.get('https://gateway.marvel.com/v1/public/comics/2', (req, res, ctx) =>
    res(
      ctx.json({
        code: 404,
        items: [],
      })
    )
  ),
  rest.get('https://gateway.marvel.com/v1/public/comics', (req, res, ctx) =>
    res(ctx.json(comicsListing))
  ),
];
