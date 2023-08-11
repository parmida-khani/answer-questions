import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import jalaliMoment from 'jalali-moment';
import {IAnswer} from "@/models/IAnswer";
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';

export default function AnswerCard({answer}: { answer: IAnswer }) {
    const isoString = answer.createdTime;
    const time = jalaliMoment(isoString).format('HH:mm');
    const date = jalaliMoment(isoString).format('jYYYY/jMM/jDD');

    return (
        <Card sx={{width: '100%', my: 2, borderRadius: '5px', boxShadow: '0 0 5px lightgray'}}>
            <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <AccountCircleIcon fontSize="small"/>
                    <Typography variant="body1" sx={{marginRight: 1}}>
                        {answer.author}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', marginTop: '8px'}}>
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
                    <SentimentSatisfiedAltOutlinedIcon fontSize="small"/>
                    <Typography variant="body2" color="textSecondary" sx={{mr: 0.5}}>
                        {answer.numOfLikes}
                    </Typography>
                    <SentimentDissatisfiedOutlinedIcon fontSize="small" sx={{mr: 1}}/>
                    <Typography variant="body2" color="textSecondary" sx={{mr: 0.5}}>
                        {answer.numOfDislikes}
                    </Typography>
                </Box>
            </CardContent>
            <CardContent sx={{backgroundColor: '#F9F9F9'}}>
                <Typography variant="body2">{answer.body}</Typography>
            </CardContent>
        </Card>
    );
}
