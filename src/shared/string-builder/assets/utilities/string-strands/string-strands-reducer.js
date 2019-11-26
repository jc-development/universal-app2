import { FETCH_STRING_STRANDS_REQUESTED, FETCH_STRING_STRANDS_SUCCEEDED, FETCH_STRING_STRANDS_FAILED } from './string-strands-actions';

const initialState = {
  stringStrands: [
      {
        attributes: {
          name: 'Teal (370)',
          num_colors: 1,
          materials: ['8190', '8125G', '452x'],
          hex_colors: ['#10b7a9']
        }
      }
    ]
};

const stringStrandsReducer = (previousState = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_STRING_STRANDS_SUCCEEDED:
    // console.log('payload: ', payload)
      return {
        ...previousState,
        stringStrands: payload
      };

    default:
      return previousState;
  }
};

export default stringStrandsReducer;
