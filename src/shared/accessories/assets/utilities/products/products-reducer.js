import { 
  FETCH_PRODUCTS_REQUESTED, FETCH_PRODUCTS_SUCCEEDED, FETCH_PRODUCTS_FAILED,
} from './products-actions';

const initialState = {
  strings: [
    {
      handle: 'standard-string',
      title: 'Standard String',
      variants: [
        {
          product_id: 8231752135,
          id: 26432406535,
          price: '110.00',
          title: 'Complete Set'
        },
        {
          product_id: 8231752135,
          id: 26432406599,
          price: '65.00',
          title: 'One Cam String'
        },
        {
          product_id: 8231752135,
          id: 26432406663,
          price: '45.00',
          title: 'Two Cam String'
        },
        {
          product_id: 8231752135,
          id: 26432406727,
          price: '35.00',
          title: 'Non-Split Buss Cable'
        },
        {
          product_id: 8231752135,
          id: 26432406791,
          price: '45.00',
          title: 'Split Buss Cable'
        }
      ]
    }
  ],
  accessories: [
    {
      id: 8231862087,
      title: "Cobalt Ice String Wax",
      handle: "cobalt-ice-string-wax",
      image: "https://cdn.shopify.com/s/files/1/1403/1089/products/icon_wax.png?v=1476375263",
      variants: [
        {
          id: 26432910279,
          price: '12.00'
        }
      ]
    }
  ],
  apparel: [
    {
      id: 8231900807,
      title: "Winner's Choice Logo Hat",
      handle: "winners-choice-logo-hat",
      image: "https://cdn.shopify.com/s/files/1/1403/1089/products/icon_hat.png?v=1476375480",
      variants: [
        {
          id: 26433125511,
          price: '19.99'
        }
      ]
    }
  ],
  services: [
    {
      id: 9079005895,
      title: "Nitro XL Button Installation",
      handle: "nitro-xl-button-installation",
      image: null,
      variants: [
        {
          id: 30667019143,
          price: '2.00'
        }
      ]
    }
  ]
};

const productsReducer = (previousState = initialState, {type, payload}) => {
  switch (type) {
    case FETCH_PRODUCTS_SUCCEEDED:
      return {
        ...previousState,
        [payload.productType] : payload.productTypeArray
      };

    default:
      return previousState;
  }
};

export default productsReducer;
