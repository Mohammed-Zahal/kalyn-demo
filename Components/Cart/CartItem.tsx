import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { CartItemInterface } from "../../types/generated/graphql";
import useUpdateToCart from "../hooks/useUpdateToCart";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/types";
interface CartItemProps {
  cartItem: CartItemInterface;
}
const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  const cart = useSelector<RootState, RootState["cart"]>((state) => state.cart);
  const cartId = cart.data.cart?.id;

  const {
    updateCartItems: [updateCartItems],
  } = useUpdateToCart();

  const quantityChange = useCallback(
    (data: number) => {
      updateCartItems({
        variables: {
          input: {
            cart_id: cartId || "",
            cart_items: [
              {
                cart_item_uid: cartItem.uid,
                quantity: data,
              },
            ],
          },
        },
      });
    },
    [cartId, cartItem.uid, updateCartItems]
  );

  const renderQuntityChanger = useCallback(() => {
    return (
      <Stack spacing={2}   direction="row" gap={1.5} py={3}>
        <Button
          onClick={() => {
            const newQuantity = Math.min(cartItem.quantity - 1);
            quantityChange(newQuantity);
          }}
        >
          -
        </Button>
        <Typography fontSize="1rem" fontFamily="roboto">
          {cartItem.quantity}
        </Typography>
        <Button
          onClick={() => {
            quantityChange(cartItem.quantity + 1);
          }}
        >
          +
        </Button>
      </Stack>
    );
  }, [cartItem.quantity, quantityChange]);

  return (
    <Grid
      className="ms-0 mt-5"
      direction="row"
      item
      xs={6}
      sm={3}
      md={3}
      lg={2.5}
    >
      <Card sx={{ width: 250 }}>
        <CardMedia
          component="img"
          sx={{ height: 500 }}
          key={cartItem?.product?.url_key}
          image={cartItem?.product?.thumbnail?.url!}
          alt="kalyan hyper image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cartItem?.product?.name?.substring(0, 20)}...
          </Typography>
        </CardContent>
        <CardActions>{renderQuntityChanger()}</CardActions>
      </Card>
    </Grid>
  );
};

export default CartItem;
