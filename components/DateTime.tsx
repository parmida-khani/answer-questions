import * as React from "react";
import {Typography} from "@mui/material";

export default function DateTime({date, time}: { date: string, time: string }) {
    return (
        <>
            <Typography variant="body2" color="textSecondary" sx={{ml: 0.5}}>
                ساعت:
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ml: 2}}>
                {time}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ml: 0.5}}>
                تاریخ:
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ml: 2}}>
                {date}
            </Typography>
        </>
    )
}