import { gql } from "@apollo/client";
import { CART_FRAGMENT } from "./fragment";

export const QUERY = gql`
  query Countries {
    countries {
      available_regions {
        code
        id
        name
      }
      full_name_english
      full_name_locale
      id
      three_letter_abbreviation
      two_letter_abbreviation
    }
  }
`;

export const GET_USER = gql`
  query GetCustomerInformation {
    customer {
      firstname
      lastname
      email
    }
    customerCart{
      id
    }
  }
`;

export const GET_CART = gql`
  ${CART_FRAGMENT}
  query GetCart($cartId: String!) {
    cart(cart_id: $cartId) {
      ...CartFragment
    }
  }
`;

export const GET_PRODUCTS = gql`
query products(
  $search: String

  $filter: ProductAttributeFilterInput
  $sort: ProductAttributeSortInput
  $currentPage: Int
  $pageSize: Int
) {
  products(
    search: $search
    filter: $filter
    sort: $sort
    currentPage: $currentPage
    pageSize: $pageSize
  ) {
    items {
     
      image {
        url
      }
      name
      sku
      uid
    }
  }
}
`;
