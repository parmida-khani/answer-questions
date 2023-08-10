'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Typography} from "@mui/material";

export default function CreateProblem({open, handleClose}: { open: boolean, handleClose: Function }) {

    return (
        <Dialog open={open} onClose={handleClose} sx={{
            "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "600px"
                },
            },
        }}
        >
            <DialogTitle sx={{fontWeight: 'bold'}}>ایجاد سوال جدید</DialogTitle>
            <DialogContent sx={{backgroundColor: '#F9F9F9'}}>
                <Typography my={1}>موضوع</Typography>
                <TextField
                    autoFocus
                    name="title"
                    margin="dense"
                    id="title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    required
                />
                <Typography my={2}>متن سوال</Typography>
                <TextField
                    id="body"
                    name="body"
                    multiline
                    rows={5}
                    fullWidth
                    required
                />
            </DialogContent>
            <DialogActions sx={{backgroundColor: '#F9F9F9', pb: 3, px: 2}}>
                <Button onClick={handleClose}>انصراف</Button>
                <Button variant="contained" sx={{color: 'white', backgroundColor: '#27AE60 !important'}}>ایجاد
                    سوال</Button>
            </DialogActions>
        </Dialog>
    );
}
