import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box, Hidden} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {IProblem} from '@/models/IProblem';
import jalaliMoment from 'jalali-moment';
import ShowDetails from "@/components/ShowDetails";
import DateTime from "@/components/DateTime";
import AnswerIcon from "@/components/AnswerIcon";


export default function ProblemCard({problem, page}: { problem: IProblem, page: string }) {
    const isoString = problem.createdTime;
    const time = jalaliMoment(isoString).format('HH:mm');
    const date = jalaliMoment(isoString).format('jYYYY/jMM/jDD');

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
                    <Hidden smDown>
                            <DateTime date={date} time={time}/>
                    </Hidden>
                    <AnswerIcon count={problem.totalAnswers}/>
                </Box>
            </CardContent>
            <CardContent sx={{backgroundColor: '#F9F9F9'}}>
                <Typography variant="body2">{problem.body}</Typography>
            </CardContent>
            {page === 'problems' && <ShowDetails id={problem.id}/>}
        </Card>
    );
}
