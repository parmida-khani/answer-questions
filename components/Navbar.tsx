'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {Button} from "@mui/material";
import CreateProblem from "@/components/createProblem";

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement | undefined>(null);
    const [open, setOpen] = React.useState(false);
    const auth = true;

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{flexGrow: 1, mb: 4}}>
            <AppBar position="static" sx={{backgroundColor: "white", boxShadow: "0 0 5px lightgray"}}>
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{flexGrow: 1, color: 'black', fontWeight: 'bold'}}>
                        لیست سوالات
                    </Typography>
                    {auth && (
                        <div>
                            <Button variant="contained" sx={{ml: 4, color: "white"}}
                                    onClick={() => setOpen(true)}>
                                سوال جدید
                            </Button>
                            <CreateProblem open={open} handleClose={() => setOpen(false)}/>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>پروفایل</MenuItem>
                                <MenuItem onClick={handleClose}>خروج</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
