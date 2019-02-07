import React from "react"
import { AppBar, Toolbar, Typography, Button, IconButton } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import LoginMenu from "./LoginMenu"
import AccountMenu from "./AccountMenu"
import { Link } from "react-router-dom";


export const Header = ({ isAuth }) => (
    <AppBar position="static">
        <Toolbar>
            <Link className="App-logo" to="/">
                Physics Coach
            </Link>

            <div className="Account-container">
                {isAuth ? <AccountMenu /> : <LoginMenu />}
            </div>

        </Toolbar>
    </AppBar>
)