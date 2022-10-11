import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { UPDATE_CART_ITEMS } from "../../apollo/Queries/mutation";
import { updateCart } from "../../redux/slice/cart";
import {
  UpdateCartItemsInput,
  UpdateCartItemsOutput,
} from "../../types/generated/graphql";

const useUpdateToCart = () => {
  const dispatch = useDispatch();

  const updateCartItems = useMutation<
    { updateCartItems: UpdateCartItemsOutput },
    {
      input: UpdateCartItemsInput;
    }
  >(UPDATE_CART_ITEMS, {
    onCompleted: (data) => {
      if (data.updateCartItems.cart) {
        dispatch(updateCart(data.updateCartItems.cart));
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return { updateCartItems };
};

export default useUpdateToCart;
