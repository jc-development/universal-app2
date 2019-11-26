import { 
  ADD_TO_CART_REQUESTED, ADD_TO_CART_SUCCEEDED, ADD_TO_CART_FAILED,
  REMOVE_FROM_CART_REQUESTED, REMOVE_FROM_CART_SUCCEEDED, REMOVE_FROM_CART_FAILED,
  ADD_NITRO_BUTTON_INSTALL_REQUESTED, ADD_NITRO_BUTTON_INSTALL_SUCCEEDED, ADD_NITRO_BUTTON_INSTALL_FAILED,
  ADD_NITRO_XL_BUTTON_INSTALL_REQUESTED, ADD_NITRO_XL_BUTTON_INSTALL_SUCCEEDED, ADD_NITRO_XL_BUTTON_INSTALL_FAILED,
} from './cart-actions';

const initialState = {
  items: [],
  nitroButtonInstallClicked: false,
  nitroXLButtonInstallClicked: false
};

const removeAndUpdateCart = (array, domId) => {
  let cartArray = array
  const itemClickedToRemove = array.find((item) => (item.domId === domId));
  if(itemClickedToRemove.packageName === 'Nitro Balls') {
    cartArray = array.filter((item) => item.name !== 'Nitro Button Installation')
  } else if (itemClickedToRemove.packageName === 'Nitro XL Buttons') {
    cartArray = array.filter((item) => item.name !== 'Nitro XL Button Installation')
  }
  const updatedCartItemsList = cartArray.filter((item) => item.domId !== domId)
  const reorderedCartItemsList = updatedCartItemsList.map((item , i) => ({...item, domId: `cart-item-${i}`}))
  return reorderedCartItemsList
}

const cartReducer = (previousState = initialState, {type, payload}) => {
  switch (type) {
    case ADD_TO_CART_SUCCEEDED:
      return {
        ...previousState,
        items: [
          ...previousState.items,
          {...payload, domId: `cart-item-${previousState.items.length}`}
        ]
      };
    
    case REMOVE_FROM_CART_SUCCEEDED:
      // console.log('payload: ', payload)
      return {
        ...previousState,
        items: removeAndUpdateCart(previousState.items, payload)
      }
    
    case ADD_NITRO_BUTTON_INSTALL_SUCCEEDED:
      return {
        ...previousState,
        nitroButtonInstallClicked: payload
      }

    case ADD_NITRO_XL_BUTTON_INSTALL_SUCCEEDED:
      return {
        ...previousState,
        nitroXLButtonInstallClicked: payload
      }

    default:
      return previousState;
  }
};

export default cartReducer;
