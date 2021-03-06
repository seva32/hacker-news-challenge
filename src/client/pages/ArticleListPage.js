/* eslint-disable no-undef */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import ArticleDetailModal from '../components/ArticleDetailModal';
import { fetchArticles } from '../actions';

const ArticleListPage = (props) => {
  const [modal, setModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({});

  const readArticle = (article) => {
    setCurrentArticle(article);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const renderArticles = () => {
    return props.articles.map((article) => (
      <div className="col s12 m6 l6 xl4" key={article.title}>
        <div className="card small">
          <div className="card-content">
            <span className="card-title">{article.title}</span>
          </div>
          <div className="card-action">
            <a href="javascript:void(0)" onClick={() => readArticle(article)}>
              Read More
            </a>
          </div>
        </div>
      </div>
    ));
  };

  const { match } = props;

  const category = match.params.id;

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>{`${category} Articles`}</title>
        <meta
          name="description"
          content={`Latest ${category} articles, popular articles from most popular news websites of the world`}
        />
      </Helmet>
    );
  };

  const { fetchArticles: loadArticles } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (match.params.id) {
      loadArticles(match.params.id);
    } else {
      loadArticles();
    }
  }, [loadArticles, match.params.id]);

  return (
    <div>
      {head()}
      {modal ? <ArticleDetailModal handler={closeModal} data={currentArticle} /> : null}
      <div className="row">
        <div className="section">
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)} Articles</h3>
        </div>
        <div className="divider" />
        <div className="section">
          <div className="row">{renderArticles()}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
  };
};

const loadData = (store, param) => {
  // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
  // So we need to use store itself to load data
  return store.dispatch(fetchArticles(param)); // Manually dispatch a network request
};

ArticleListPage.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any),
  fetchArticles: PropTypes.func,
};

ArticleListPage.defaultProps = {
  articles: [],
  match: null,
  fetchArticles: null,
};

export default {
  component: connect(mapStateToProps, { fetchArticles })(ArticleListPage),
  loadData,
};
