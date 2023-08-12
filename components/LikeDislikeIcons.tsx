import * as React from "react";
import {Typography} from "@mui/material";
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';

export default function LikeDislikeIcons({
                                            likedUsers,
                                            dislikedUsers,
                                            userId
                                        }: { likedUsers: number[], dislikedUsers: number[], userId: number }) {

    return (
        <>
            <SentimentSatisfiedAltOutlinedIcon fontSize="small"
                                               color={likedUsers.includes(userId) ? 'primary' : 'inherit'}/>
            <Typography variant="body2" color="textSecondary" sx={{mr: 0.5}}>
                {likedUsers.length}
            </Typography>
            <SentimentDissatisfiedOutlinedIcon fontSize="small" sx={{mr: 1}}
                                               color={dislikedUsers.includes(userId) ? 'error' : 'inherit'}/>
            <Typography variant="body2" color="textSecondary" sx={{mr: 0.5}}>
                {dislikedUsers.length}
            </Typography>
        </>
    )
}