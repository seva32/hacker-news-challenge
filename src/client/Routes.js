import HomePage from './screens/HomePage';
import NotFoundPage from './screens/NotFoundPage';
import ArticleListPage from './screens/ArticleListPage';
import App from './App';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true,
      },
      {
        path: '/articles/:id',
        ...ArticleListPage,
      },
      {
        ...NotFoundPage,
      },
    ],
  },
];
