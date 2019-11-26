  export const getProductsByTagQuery = (productTag) => {
    return `
    query {
        products(first:20, query:"tag:'${productTag}'") {
        edges {
          node {
            id
            title
            handle
            description
            variants(first:20){
              edges {
                node {
                  id
                  title
                  price
                }
              }
            }
            tags
          }
        }
      }
    }
    `;
  };