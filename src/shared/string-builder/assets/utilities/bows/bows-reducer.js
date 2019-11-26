import { 
  FETCH_BOWS_REQUESTED, FETCH_BOWS_SUCCEEDED, FETCH_BOWS_FAILED,
  FETCH_BOW_MODELS_REQUESTED, FETCH_BOW_MODELS_SUCCEEDED, FETCH_BOW_MODELS_FAILED,
} from './bows-actions';

const initialState = {
  bows: [ {bow_brand: 'Please select a brand'} ],
  bowModels: [ {bow_brand: 'Elite', bow_model: 'Answer'} ]
};

const bowsReducer = (previousState = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_BOWS_SUCCEEDED:
      return {
        ...previousState,
        bows: payload
      };

    case FETCH_BOW_MODELS_SUCCEEDED:
      return {
        ...previousState,
        bowModels: payload
      };

    default:
      return previousState;
  }
};

export default bowsReducer;
