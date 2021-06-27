export const initialState = 'NONE';

export const reducer = (state, action) => {
  if (action.type === 'APPLICANT') return action.payload;
  if (action.type === 'RECRUITER') return action.payload;

  return state;
};
