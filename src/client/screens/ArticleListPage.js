/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import PropTypes from 'prop-types';

function ArticleListPage({ match }) {
  console.log(match.params.id);
  return <div>ArticleListPage</div>;
}

ArticleListPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
};

ArticleListPage.defaultProps = {
  match: null,
};

export default ArticleListPage;
