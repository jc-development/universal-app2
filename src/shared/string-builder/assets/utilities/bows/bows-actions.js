export const FETCH_BOWS_REQUESTED = 'FETCH_BOWS_REQUESTED';
export const FETCH_BOWS_SUCCEEDED = 'FETCH_BOWS_SUCCEEDED';
export const FETCH_BOWS_FAILED = 'FETCH_BOWS_FAILED';

export const FETCH_BOW_MODELS_REQUESTED = 'FETCH_BOW_MODELS_REQUESTED';
export const FETCH_BOW_MODELS_SUCCEEDED = 'FETCH_BOW_MODELS_SUCCEEDED';
export const FETCH_BOW_MODELS_FAILED = 'FETCH_BOW_MODELS_FAILED';

export const fetchBows = () => {
  return {
    type: FETCH_BOWS_REQUESTED,
    payload: {}
  };
}

export const receiveBows = (payload) => {
  return {
    type: FETCH_BOWS_SUCCEEDED,
    payload
  };
}

export const fetchBowModels = (bowBrand) => {
  return {
    type: FETCH_BOW_MODELS_REQUESTED,
    bowBrand
  };
}

export const receiveBowModels = (payload) => {
  return {
    type: FETCH_BOW_MODELS_SUCCEEDED,
    payload
  };
}
