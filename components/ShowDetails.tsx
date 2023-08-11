'use client'
import * as React from "react";
import {Button, CardActions} from "@mui/material";
import {useRouter} from 'next/navigation';

export default function ShowDetails({id}: { id: number }) {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push(`details/${id}`);
    };

    return (
        <CardActions sx={{backgroundColor: '#F9F9F9', justifyContent: 'end'}}>
            <Button color="primary" variant="outlined" onClick={handleButtonClick}
                    sx={{borderRadius: '5px', mb: 1, ml: 1}}>
                مشاهده جزییات
            </Button>
        </CardActions>
    )
}