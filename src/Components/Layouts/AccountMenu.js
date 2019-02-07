import React, { Fragment } from "react"

import PropTypes from 'prop-types';
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import IconButton from "@material-ui/core/IconButton"
import AccountCircle from "@material-ui/icons/AccountCircle"
import {withStyles} from "@material-ui/core/styles"

const styles = {
    buttonRoot: {
        color: "white"
    }
}

export const AccountMenu =({
    avatarUrl,
    displayName,
    goToAccount,
    onLogoutClick,
    closeAccountMenu,
    anchorEl,
    handleMenu
}) => (
    <Fragment>
        <IconButton
        aria-owns={anchorEl ? "menu-appbar": null}
        aria-haspopup = "true"
        onClick = {handleMenu}
        //classes={{root: classes.buttonRoot}}
        >
        <AccountCircle/>
        </IconButton>

        <Menu 
        id = "menu-appbar"
        anchorEl = {anchorEl}
        anchorOrigin = {{vertical: "top", horizontal: "right"}}
        transformOrigin = {{vertical: "top", horizontal: "right"}}
        open = {Boolean(anchorEl)}
        onClose={closeAccountMenu}>
        <MenuItem onClick ={onLogoutClick}>Sign Out</MenuItem>
</Menu>
    </Fragment>
)

export default withStyles(styles)(AccountMenu)