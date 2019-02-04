import React from "react"
import {AppBar,Toolbar,Typography, Button,IconButton} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import LoginMenu from "./LoginMenu"
import AccountMenu from "./AccountMenu"


export const Header = ({
    isAuth,
}) =>(
<AppBar position="static">
        <Toolbar>
         <Typography variant="headline"  color = "inherit">
         Physics Coach
         </Typography>
         {isAuth? <AccountMenu/>: <LoginMenu/>}
        </Toolbar>
      </AppBar>
)