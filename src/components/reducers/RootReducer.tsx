import { combineReducers } from 'redux';
import jokesReducer from './JokesReducer'; // Assuming you have a jokesReducer

const rootReducer = combineReducers({
  jokes: jokesReducer, // Assuming jokesReducer handles the state related to jokes
  // Add more reducers here if needed
});

export default rootReducer;