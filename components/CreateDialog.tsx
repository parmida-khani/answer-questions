import CreateProblem from "@/components/CreateProblem";
import * as React from "react";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function CreateDialog() {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Button
                variant="contained"
                sx={{
                    ml: 2,
                    color: "white",
                    backgroundColor: '#27AE60 !important',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onClick={() => setOpen(true)}
            >
                <AddIcon sx={{ml: 1, fontSize: '1rem'}}/>
                سوال جدید
            </Button>
            <CreateProblem open={open} handleClose={() => setOpen(false)}/>
        </>
    )
}
