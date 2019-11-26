import { call, put, takeLatest } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { getProductsByTagQuery } from './products-queries'
import {
  FETCH_PRODUCTS_REQUESTED,
  FETCH_PRODUCTS_SUCCEEDED,
  FETCH_PRODUCTS_FAILED,
} from './products-actions';
const url = 'https://store.winnerschoicestrings.com/api/graphql'

export const fetchProductsFromAPI = (query, variables) => fetch(url, {
  method: 'post',
  headers: {
    'X-Shopify-Storefront-Access-Token': 'removedForPrivacy',
    'Content-Type':'application/json',
  },
  body: JSON.stringify({
    query: query(variables)
  })
}).then( response => {
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
});

export function* fetchProducts({productTag}) {
  try {
    const responseFromApi = yield call(fetchProductsFromAPI, getProductsByTagQuery, productTag); // call(function, query, variables)

    const productsArray = responseFromApi.data;
    const formattedData = productsArray.products.edges.map((product) => {
      const productIdDecoded = Buffer.from(product.node.id, 'base64').toString("ascii").split("/")
      const productId = parseInt(productIdDecoded[productIdDecoded.length - 1])
      return {
        id: productId,
        title: product.node.title,
        handle: product.node.handle,
        description: product.node.description,
        variants: product.node.variants.edges.map((variant) => {
          const variantIdDecoded = Buffer.from(variant.node.id, 'base64').toString("ascii").split("/")
          const variantId = parseInt(variantIdDecoded[variantIdDecoded.length - 1])
          return {
            product_id: productId,
            id: variantId,
            title: variant.node.title,
            price: variant.node.price
          }
        })
      }
    })

    let productTypeObject

    if(productTag === "string") {
      productTypeObject = {
        productType: "strings",
        productTypeArray: formattedData
      }
    } else if(productTag === "accessory") {
      productTypeObject = {
        productType: "accessories",
        productTypeArray: formattedData
      }
    } else if(productTag === "service") {
      productTypeObject = {
        productType: "services",
        productTypeArray: formattedData
      }
    } else {
      productTypeObject = {
        productType: productTag,
        productTypeArray: formattedData
      }
    }

    yield put({
      type: FETCH_PRODUCTS_SUCCEEDED,
      payload: productTypeObject
    });
  } catch (error) {
    console.log('failed')
    yield put({
      type: FETCH_PRODUCTS_FAILED,
      payload: {
        productsState: { error }
      }
    });
  }
}

export function* fetchProductsSaga() {
  yield takeLatest(FETCH_PRODUCTS_REQUESTED, fetchProducts);
};
