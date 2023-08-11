'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Button, CardActions, Box} from '@mui/material';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {IProblem} from '@/models/IProblem';
import jalaliMoment from 'jalali-moment';
import { useRouter } from 'next/navigation';


export default function ProblemCard({problem}: { problem: IProblem }) {
    const router = useRouter();
    const isoString = problem.createdTime;
    const time = jalaliMoment(isoString).format('HH:mm');
    const date = jalaliMoment(isoString).format('jYYYY/jMM/jDD');

    const handleButtonClick = () => {
        router.push(`details/${problem.id}`);
    };

    return (
        <Card sx={{width: '100%', my: 2, borderRadius: '5px', boxShadow: '0 0 5px lightgray'}}>
            <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <AccountCircleIcon fontSize="small"/>
                    <Typography variant="body1" sx={{marginRight: 1}}>
                        {problem.title}
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
                    <ChatBubbleOutlineOutlinedIcon fontSize="small"/>
                    <Typography variant="body2" color="textSecondary" sx={{mr: 0.5}}>
                        {problem.totalAnswers}
                    </Typography>
                </Box>
            </CardContent>
            <CardContent sx={{backgroundColor: '#F9F9F9'}}>
                <Typography variant="body2">{problem.body}</Typography>
            </CardContent>
            <CardActions sx={{backgroundColor: '#F9F9F9', justifyContent: 'end'}}>
                <Button color="primary" variant="outlined" onClick={handleButtonClick}
                        sx={{borderRadius: '5px', mb: 1, ml: 1}}>
                    مشاهده جزییات
                </Button>
            </CardActions>
        </Card>
    );
}
