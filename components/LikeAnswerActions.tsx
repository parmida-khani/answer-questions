import * as React from "react";
import {Button, CardActions} from "@mui/material";
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';

export default function LikeAnswerActions({
                                       onLikeClick,
                                       onDislikeClick
                                   }: { onLikeClick: Function, onDislikeClick: Function }) {


    return (
        <CardActions sx={{backgroundColor: '#F9F9F9', justifyContent: 'end'}}>
            <Button
                color="primary"
                variant="outlined"
                onClick={onLikeClick}
                startIcon={<SentimentSatisfiedAltOutlinedIcon sx={{ml: 1}}/>}
                sx={{borderRadius: '5px', mb: 1, ml: 1, pr: 1}}
            >
                پاسخ خوب بود
            </Button>
            <Button
                color="error"
                variant="outlined"
                onClick={onDislikeClick}
                startIcon={<SentimentDissatisfiedOutlinedIcon sx={{ml: 1}}/>}
                sx={{borderRadius: '5px', mb: 1, ml: 1, pr: 1}}
            >
                پاسخ خوب نبود
            </Button>
        </CardActions>
    );
}
