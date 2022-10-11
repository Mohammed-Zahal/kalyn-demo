import{ gql} from '@apollo/client'


export const ACCOUNT_INFO_FRAGMENT = gql`
  fragment AccountInformationFragment on Customer {
    id
    firstname
    lastname
    gender
    email
    mobilenumber
    is_subscribed
  }`;


  export const PRICE_FRAGMENT = gql`
  fragment Price on Money {
    currency
    value
  }
`;
  
export const DISCOUNT_FRAGMENT = gql`
  fragment Discount on Discount {
    amount {
      ...Price
    }
    label
  }
`;
export const CART_FRAGMENT = gql`
${PRICE_FRAGMENT}
${DISCOUNT_FRAGMENT}
fragment CartItemPrices on CartItemPrices {
  price {
    ...Price
  }
  row_total_including_tax {
    ...Price
  }
  total_item_discount {
    ...Price
  }
  row_total {
    ...Price
  }
  discounts {
    ...Discount
  }
}

fragment CartPrices on CartPrices {
  applied_taxes {
    amount {
      ...Price
    }
    label
  }
  discounts {
    ...Discount
  }
  grand_total {
    ...Price
  }
  subtotal_excluding_tax {
    ...Price
  }
  subtotal_including_tax {
    ...Price
  }
  subtotal_with_discount_excluding_tax {
    currency
    value
  }
}
fragment CartFragment on Cart {
  id
  total_quantity
  is_virtual
  applied_coupons {
    code
  }
  prices {
    ...CartPrices
  }
  mp_giftcard_config {
    creditUsed
    balance
  }
  email
  items {
  
    is_salable
    exception
    sellable_qty
    uid
    quantity
    prices {
      ...CartItemPrices
    }
    product {
      name
      url_key
      can_redeem
      price_rate
      price_range {
        minimum_price {
          regular_price {
            value
          }
        }
      }
      url_suffix
      thumbnail {
        url
        label
      }
    }
  }
  available_payment_methods {
    code
    title
  }
  selected_payment_method {
    code
    purchase_order_number
    title
  }
  billing_address {
    firstname
    lastname
    address_label
    city
    company
    country {
      code
      label
    }
    region {
      code
      label
      region_id
    }
    customer_notes
    postcode
    street
    telephone
  }
  shipping_addresses {
    firstname
    lastname
    address_label
    city
    company
    country {
      code
      label
    }
    customer_notes
    pickup_location_code
    postcode
    street
    telephone
    available_shipping_methods {
      available
      carrier_code
      carrier_title
      error_message
      method_code
      method_title
      amount {
        ...Price
      }
      price_excl_tax {
        ...Price
      }
      price_incl_tax {
        ...Price
      }
    }
    region {
      code
      label
      region_id
    }
    selected_shipping_method {
      carrier_code
      carrier_title
      method_code
      method_title
      amount {
        ...Price
      }
    }
  }
}
`;