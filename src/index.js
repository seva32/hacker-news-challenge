/* eslint-disable no-unused-vars */
import '@babel/polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import renderer from './render';
import Routes from './client/Routes';

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('*', (req, res) => {
  const params = req.params[0].split('/');
  const id = params[2];
  const routes = matchRoutes(Routes, req.path);

  const promises = routes
    .map(({ route }) => {
      return route.loadData ? route.loadData({}, id) : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
      return null;
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, context);

    if (context.notFound) {
      res.status(404);
    }

    res.send(content);
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
