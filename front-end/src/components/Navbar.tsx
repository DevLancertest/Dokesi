import React from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useWallet } from "@solana/wallet-adapter-react";
import styled from "styled-components";
import { WalletDialogButton } from "@solana/wallet-adapter-material-ui";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DrawerComponent from "./Drawer";

const ConnectButton = styled(WalletDialogButton)`
  background: url("/assets/image/redbtn-small-back.png");
  background-color: transparent;
  box-shadow: none;
  background-repeat: no-repeat;
  background-size: 204px 64px;
  text-transform: none;
  margin: 10px 100px 10px 0px;
  padding: 15px 50px 20px;
  font-size: 17px;
  &:hover {
    cursor: pointer;
  }
`;

const ConnectAfter = styled.div`
  background: url("/assets/image/redbtn-small-back.png");
  background-repeat: no-repeat;
  background-size: 186px 59px;
  text-transform: none;
  margin: 10px 100px 10px 0px;
  padding: 15px 50px 20px;
  font-size: 17px;
  &:hover {
    cursor: pointer;
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appbarClass: {
      background: "rgba(217, 217, 217, 0.15)",
      backdropFilter: "blur(7px)",
    },
    title: {
      fontSize: "46px",
      lineHeight: "100px",
      fontFamily: "LondrinaSolidBlack",
      fontWeight: 900,
      marginBottom: "4px",
      backgroundImage: `url("/assets/image/title-back.png")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      padding: "0px 92px",
    },
    navlinks: {
      margin: "0px 90px",
      display: "flex",
      justifyContent: "center",
      background: "rgba(0, 0, 0, 0.34)",
      boxShadow: "0px 10px 80px rgba(0, 0, 0, 0.09)",
      borderRadius: "56px",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "17px",
      margin: theme.spacing(2),
      "&:hover": {
        color: "yellow",
        borderBottom: "1px solid yellow",
        cursor: "pointer",
      },
    },
  })
);

const Navbar = () => {
  const classes = useStyles();
  const wallet = useWallet();
  const matchesMD = useMediaQuery("(max-width:1365px)");
  const matchesSM = useMediaQuery("(max-width:1100px)");
  const matchesXS = useMediaQuery("(max-width:750px)");

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbarClass}>
        <Toolbar style={{ padding: "0px" }}>
          <Typography
            className={classes.title}
            style={
              matchesXS
                ? {
                    fontSize: "24px",
                    backgroundSize: "100% 68px",
                    lineHeight: "68px",
                    padding: "0px 40px",
                  }
                : matchesMD
                ? {
                    fontSize: "30px",
                    backgroundSize: "300px auto",
                    lineHeight: "84px",
                  }
                : {}
            }
          >
            DOKESI
          </Typography>
          <div style={{ flexGrow: 1 }}>
            {matchesXS ? (
              <DrawerComponent />
            ) : (
              <div
                className={classes.navlinks}
                style={{
                  margin: `${matchesMD ? "0px 10px 0px 0px" : "0px 90px"}`,
                }}
              >
                <Link to="#" className={classes.link}>
                  Home
                </Link>
                <Link to="#about" className={classes.link}>
                  About us
                </Link>
                <Link to="#contact" className={classes.link}>
                  Roadmap
                </Link>
                <Link to="#faq" className={classes.link}>
                  FAQ
                </Link>
                <Link to="#faq" className={classes.link}>
                  Team
                </Link>
              </div>
            )}
          </div>
          {!wallet.connected ? (
            <ConnectButton
              style={{ display: `${matchesSM ? "none" : "block"}` }}
            >
              Connect Wallet
            </ConnectButton>
          ) : (
            <ConnectAfter
              style={{ display: `${matchesSM ? "none" : "block"}` }}
            >
              Connected
            </ConnectAfter>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
