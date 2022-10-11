import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import {
  AddToCartMutation,
  ADD_PRODUCTS_TO_CART,
} from "../../apollo/Queries/mutation";
import { updateCart } from "../../redux/slice/cart";

const useCart = () => {
  const dispatch = useDispatch();
  const addProductsToCart = useMutation<
    AddToCartMutation["Response"],
    AddToCartMutation["Variables"]
  >(ADD_PRODUCTS_TO_CART, {
    onCompleted: (data) => {
      console.log("cart-Data:", data.addProductsToCart);
      dispatch(updateCart(data.addProductsToCart));
    },
    onError: (error) => {
      console.log("AddProductError :", error);
    },
  });
  return { addProductsToCart };
};

export default useCart;
