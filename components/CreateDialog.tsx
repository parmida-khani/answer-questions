'use client'
import CreateProblem from "@/components/CreateProblem";
import * as React from "react";
import {Button} from "@mui/material";

export default function CreateDialog() {
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Button variant="contained" sx={{ml: 4, color: "white", backgroundColor: '#27AE60 !important'}}
                    onClick={() => setOpen(true)}>
                سوال جدید
            </Button>
            <CreateProblem open={open} handleClose={() => setOpen(false)}/>
        </div>
    )
}