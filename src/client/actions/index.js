import axios from 'axios';

import { API_URL } from '../../utils/config';

export const FETCH_ARTICLES = 'fetch_articles';

const getStory = async (id) => {
  try {
    const story = await axios.get(`${API_URL}/item/${id}.json`);
    return story.data;
  } catch (error) {
    console.log('Error while getting a story.');
  }
  return null;
};

export const fetchArticles = (source) => async (dispatch) => {
  let stories;
  try {
    const { data: storyIds } = await axios.get(`${API_URL}/${source}stories.json`);
    stories = await Promise.all(storyIds.slice(0, 12).map(getStory));
  } catch (error) {
    console.log('Error while getting list of stories.');
  }

  dispatch({
    type: FETCH_ARTICLES,
    payload: stories,
  });
};
