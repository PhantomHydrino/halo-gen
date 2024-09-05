export const DELETE_JOKE = 'DELETE_JOKE';

export const deleteJoke = (index: number) => ({
  type: DELETE_JOKE,
  payload: index
});

export const ADD_JOKE = 'ADD_JOKE';

export const addJoke = (newJoke:string) => ({
  type: ADD_JOKE,
  payload: newJoke
});