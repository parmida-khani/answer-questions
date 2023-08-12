import * as React from "react";
import {Typography} from "@mui/material";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

export default function AnswerIcon({count}: { count: number }) {
    return (
        <>
            <ChatBubbleOutlineOutlinedIcon fontSize="small"/>
            <Typography variant="body2" color="textSecondary" sx={{mr: 0.5}}>
                {count}
            </Typography>
        </>
    )
}