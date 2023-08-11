import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CreateDialog from '@/components/CreateDialog';

export default function Navbar() {
    const auth = true;

    return (
        <Box sx={{ flexGrow: 1, mb: 4 }}>
            <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: '0 0 5px lightgray' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div" sx={{ color: 'black', fontWeight: 'bold' }}>
                        لیست سوالات
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <CreateDialog />
                        {auth && (
                            <>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
