import React from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-rating-stars-component';

const ArticleDetailModal = (props) => {
  const { handler, data } = props;
  return (
    <>
      <div
        id="modal1"
        className="modal"
        style={{
          zIndex: 1003,
          display: 'block',
          opacity: 1,
          top: 10,
          width: '60vw',
          maxHeight: '80vh',
        }}
      >
        <div className="modal-footer">
          <button
            type="button"
            onClick={handler}
            className="modal-close waves-effect waves-green btn red"
          >
            Close
          </button>
        </div>
        <div className="modal-content">
          <h5 style={{ paddingRight: '1em' }}>{data.title}</h5>
          <ReactStars
            count={5}
            value={data.score}
            onChange={null}
            size={24}
            activeColor="#ffd700"
          />
          <p>
            By:
            {data.by}
          </p>
          <p>{data.content}</p>
          <div className="divider" />
          <div className="section">
            <a
              href={data.url}
              className="waves-effect waves-light btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Full Article
            </a>
          </div>
        </div>
      </div>
      <div
        role="presentation"
        onClick={handler}
        className="modal-overlay"
        style={{ zIndex: 1002, display: 'block', opacity: 0.5 }}
      />
    </>
  );
};

ArticleDetailModal.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  handler: PropTypes.func,
};

ArticleDetailModal.defaultProps = {
  data: null,
  handler: null,
};

export default ArticleDetailModal;
