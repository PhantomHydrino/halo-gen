import { DELETE_JOKE, ADD_JOKE } from "../reduxActions/ReduxActions";



const initialState = {
  jokes: [] as string[]
};
  
const jokesReducer = (state = initialState, action: { type: string; payload: number; }) => {
    switch (action.type) {
      case ADD_JOKE:
        return {
          ...state,
          jokes: [...state.jokes, action.payload]
        };
      case DELETE_JOKE:
        return {
          ...state,
          jokes: state.jokes.filter((_, index) => index !== action.payload)
        };
      default:
        return state;
    }
};
  
export default jokesReducer;