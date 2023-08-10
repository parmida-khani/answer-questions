import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Button, CardActions, CardHeader} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {IProblem} from "@/models/IProblem";

export default function ProblemCard({problem}: { problem: IProblem }) {
    return (
        <Card sx={{width: "100%", my: 2, borderRadius: "5px", boxShadow: "0 0 5px lightgray"}}>
            <CardHeader title={problem.title}/>
            <CardContent sx={{backgroundColor: '#F9F9F9'}}>
                <Typography variant="body2">
                    {problem.body}
                </Typography>
            </CardContent>
            <CardActions sx={{backgroundColor: "#F9F9F9", justifyContent: "end"}}>
                <Button color="primary" variant="outlined" sx={{borderRadius: "5px", mb: 1, ml: 1}}>
                    مشاهده جزییات
                </Button>
            </CardActions>
        </Card>
    );
}
