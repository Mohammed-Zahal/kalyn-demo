import { gql } from "@apollo/client";
import {
  AddProductsToCartOutput,
  CartItemInput,
} from "../../types/generated/graphql";
import { CART_FRAGMENT } from "./fragment";
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;

export const REGISTER = gql`
  mutation register($customerInput: CustomerInput!) {
    createCustomer(input: $customerInput) {
      customer {
        firstname
        lastname
        email
      }
    }
  }
`;

export const ADD_PRODUCTS_TO_CART = gql`
  ${CART_FRAGMENT}
  mutation addProductToCart($cartId: String!, $items: [CartItemInput!]!) {
    addProductsToCart(cartId: $cartId, cartItems: $items) {
      cart {
        ...CartFragment
      }
      user_errors {
        message
        code
      }
    }
  }
`;

export const UPDATE_CART_ITEMS = gql`
  mutation updateCartItem($input: UpdateCartItemsInput) {
    updateCartItems(input: $input) {
      cart {
        email
        id
        items {
          quantity
        }
        total_quantity
      }
    }
  }
`;

export const REMOVE_PRODUCT_FROM_CART = gql`
  ${CART_FRAGMENT}
  mutation removeFromCart($removeItemInput: RemoveItemFromCartInput) {
    removeItemFromCart(input: $removeItemInput) {
      cart {
        ...CartFragment
      }
    }
  }
`;

export const EMPTY_CART = gql`
  mutation emptyCart {
    createEmptyCart
  }
`;

export type AddToCartMutation = {
  Response: {
    addProductsToCart: AddProductsToCartOutput;
  };
  Variables: {
    cartId: string;
    items: CartItemInput[];
  };
};
