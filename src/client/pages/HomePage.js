/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types'; // ES6
import { fetchArticles } from '../actions';
import ArticleDetailModal from '../components/ArticleDetailModal';

const HomePage = (props) => {
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
    return props.articles.map((article) => {
      return (
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
      );
    });
  };

  const head = () => {
    return (
      <Helmet key={Math.random()}>
        <title>Hacker News</title>
        <meta
          name="description"
          content="Breaking news,latest articles, popular articles from most popular news websites of the world"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
    );
  };

  const { fetchArticles: loadArticles } = props;

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
    loadArticles('top');
  }, [loadArticles]);

  return (
    <div>
      {head()}
      {modal ? <ArticleDetailModal handler={closeModal} data={currentArticle} /> : null}
      <div className="row">
        <div className="section">
          <h3>Popular Articles</h3>
        </div>
        <div className="divider" />
        <div className="section" style={{ minHeight: '90vh' }}>
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

const loadData = (store) => {
  // For the connect tag we need Provider component but on the server at this moment app is not rendered yet
  // So we need to use store itself to load data
  return store.dispatch(fetchArticles()); // Manually dispatch a network request
};

HomePage.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.any),
  fetchArticles: PropTypes.func,
};

HomePage.defaultProps = {
  articles: [],
  fetchArticles: null,
};

export default {
  component: connect(mapStateToProps, { fetchArticles })(HomePage),
  loadData,
};
