import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { GET_PRODUCTS } from "../../apollo/Queries/queries";
import { RootState } from "../../redux/types";
import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  ProductInterface,
  Products,
  SimpleProduct,
} from "../../types/generated/graphql";
import useCart from "../hooks/useCart";
const ProductListing = () => {
  const productItem = useQuery<
    { products: Products; product: SimpleProduct & ProductInterface },
    {
      search?: string;
      filter?: ProductAttributeFilterInput;
      pageSize?: number;
      currentPage?: number;
      sort?: ProductAttributeSortInput;
    }
  >(GET_PRODUCTS, {
    onCompleted: (data) => {
      console.log("item", data);
    },
    onError: (error) => {
      console.log(error);
    },
    variables: {
      filter: {},
      search: "Dairy, Egg & Chilled Food",
      currentPage: 1,
      pageSize: 10,
      sort: {},
    },
  });

  const cart = useSelector<RootState, RootState["cart"]>((state) => state.cart);

  const {
    addProductsToCart: [addProductsToCart],
  } = useCart();

  const add = (sku: string | undefined | null) => {
    console.log("products:", productItem.data);
    const cartId = cart.data.cart?.id;
    console.log("cartId:", cartId);
    console.log("sku:", sku);
    if (cartId && sku) {
      addProductsToCart({
        variables: {
          cartId,
          items: [
            {
              quantity: 1,
              sku,
            },
          ],
        },
      });
    }
  };

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ height: "100%" }}
      className="mt-3"
    >
      {productItem.data?.products?.items?.map((product) => (
        <Grid item xs={2} sm={3} md={3} key={product?.uid}>
          <Card
            className="mt-5  ms-4"
            sx={{ maxWidth: 250, marginBottom: 3 }}
            style={{ width: "100%" }}
          >
            <CardMedia
              component="img"
              height="100%"
              image={product?.image?.url!}
              alt=""
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {product?.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ fontWeight: "bold" }}
              >
                {product?.sku}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => add(product?.sku)}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductListing;
