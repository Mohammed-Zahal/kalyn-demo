/* eslint-disable @next/next/no-img-element */
import {
  alpha,
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { updateToken, updateUser } from "../../redux/slice/auth";
import { RootState } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../../styles/Home.module.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.35),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(updateUser(null));
    dispatch(updateToken(null));
  };
  const user = useSelector((state: RootState) => state.auth.data.user);
  const cart = useSelector<RootState, RootState["cart"]>((state) => state.cart);


  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawerWidth = 240;

  const items = (
    <>
      <Link href={"./login"}>
        <a className={styles.heads}>
          <AccountCircleOutlinedIcon />
          {user ? user.firstname : "Login"}
        </a>
      </Link>
      <Link href="./register">
        <a className={styles.heads}>
          {user ? (
            <></>
          ) : (
            <>
              <AddBoxOutlinedIcon />
              Register
            </>
          )}
        </a>
      </Link>
      <Button className={styles.buttons} onClick={logOut}>
        <ExitToAppOutlinedIcon />
        Logout
      </Button>
      <Link href={"./cart"}>
        <a className={styles.heads}>
          {user ? (
            <>
              <AddShoppingCartIcon />
              Cart
            </>
          ) : (
            <></>
          )}
        </a>
      </Link>
    </>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Kalyan Hyper
      </Typography>

      <List>
        <ListItem key="" disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ul>{items}</ul>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  const logo = (
    <Stack>
      <img
        src="https://www.kalyanhyper.com/skin/frontend/codazon_fastest/grocery_gourmet/images/media/logo.png"
        alt="kaliyan_hyper"
      />
    </Stack>
  );

  return (
    <Box>
      <AppBar
        component="nav"
        style={{ height: "60px", backgroundColor: " rgb(244, 250, 247)" }}
      >
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", marginTop: "10px" }}
        >
          {logo}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box component="nav">
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>

          <Box>
            <Stack
              sx={{
                display: { xs: "none", sm: "block" },
                justifyContent: "space-between",
              }}
            >
              <Link href={"./login"}>
                <a className={styles.heads}>
                  <AccountCircleOutlinedIcon />
                  {user ? user.firstname : "Login"}
                </a>
              </Link>
              <Link href="./register">
                <a className={styles.heads}>
                  {user ? (
                    <></>
                  ) : (
                    <>
                      <AddBoxOutlinedIcon />
                      Register
                    </>
                  )}
                </a>
              </Link>
              <Button className={styles.buttons} onClick={logOut}>
                <ExitToAppOutlinedIcon />
                Logout
              </Button>
              <Link href={"./cart"}>
                <a className={styles.heads}>
                  {user ? (
                    <>
                      <AddShoppingCartIcon />
                      Cart
                     ({cart.data.cart?.total_quantity})
                    </>
                  ) : (
                    <></>
                  )}
                </a>
              </Link>
            </Stack>
          </Box>

          <Stack
            direction="row"
            sx={{ display: { sm: "none" }, justifyContent: "flex-end " }}
            width="100%"
          >
            <IconButton
              color="error"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Stack>
      </AppBar>
    </Box>
  );
};

export default Navbar;
