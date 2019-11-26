export const FETCH_STRING_STRANDS_REQUESTED = 'FETCH_STRING_STRANDS_REQUESTED';
export const FETCH_STRING_STRANDS_SUCCEEDED = 'FETCH_STRING_STRANDS_SUCCEEDED';
export const FETCH_STRING_STRANDS_FAILED = 'FETCH_STRING_STRANDS_FAILED';


export const fetchStringStrands = () => {
  return {
    type: FETCH_STRING_STRANDS_REQUESTED,
    payload: {}
  };
}

export const receiveStringStrands = (payload) => {
  // console.log('payload: ', payload);
  return {
    type: FETCH_STRING_STRANDS_SUCCEEDED,
    payload
  };
}

