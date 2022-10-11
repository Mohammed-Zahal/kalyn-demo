import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EMPTY_CART } from "../apollo/Queries/mutation";
import { GET_CART, GET_USER } from "../apollo/Queries/queries";
import { updateUser } from "../redux/slice/auth";
import { updateCart, updateCartId } from "../redux/slice/cart";
import { RootState } from "../redux/types";
const AppWrapper = ({ children }: any) => {
  const token = useSelector((state: RootState) => state.auth.data.token);
  const dispatch = useDispatch();
  const [getUser] = useLazyQuery(GET_USER, {
    onCompleted: (data) => {
      console.log(data);
      dispatch(updateUser(data.customer));
      dispatch(updateCartId(data.customerCart.id));
    },
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    console.log(token);
    if (token) {
      getUser();
    }
  }, [token, getUser]);
  const cart = useSelector((state: RootState) => state.cart.data);
  const cartId = cart.cartId;
  const [emptyCart] = useMutation(EMPTY_CART, {
    onCompleted: (data) => {
      console.log(data);
      dispatch(updateCartId(data.createEmptyCart));
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const [getCart] = useLazyQuery(GET_CART, {
    onCompleted: (data) => {
      console.log(data);
      dispatch(updateCart(data.cart));
    },
    onError(error) {
      console.log(error);
    },
    variables: {
      cartId,
      cart,
    },
  });
  useEffect(() => {
    console.log("cartId", emptyCart);
    if (!cart.cartId) {
      emptyCart();
    } else if (cart.cartId && !cart.cart) {
      getCart();
    }
  }, [getCart, emptyCart]);

  return <div>{children}</div>;
};

export default AppWrapper;
