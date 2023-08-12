'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box, Hidden} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import jalaliMoment from 'jalali-moment';
import {IAnswer} from "@/models/IAnswer";
import LikeDislikeActions from "@/components/LikeDislikeActions";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateLikedDislikedUsers} from "@/api/answers";
import {useState} from "react";
import DateTime from "@/components/DateTime";
import LikeDislikeIcons from "@/components/LikeDislikeIcons";

export default function AnswerCard({answer}: { answer: IAnswer }) {
    const [likedUsers, setLikedUsers] = useState<number[]>([...answer.likedUsers]);
    const [dislikedUsers, setDislikedUsers] = useState<number[]>([...answer.dislikedUsers]);
    const isoString = answer.createdTime;
    const time = jalaliMoment(isoString).format('HH:mm');
    const date = jalaliMoment(isoString).format('jYYYY/jMM/jDD');
    const userId = 1;

    const queryClient = useQueryClient();
    const updateLikesDislikesMutation = useMutation({
        mutationFn: updateLikedDislikedUsers,
        onSuccess: (data) => {
            void queryClient.invalidateQueries(['answers']);
            setLikedUsers([...data.likedUsers]);
            setDislikedUsers([...data.dislikedUsers]);
        },
    });

    const addUserToArray = (array: number[]) => {
        const newArray: number[] = [...array];
        newArray.push(userId);
        return newArray;
    }

    const removeUserFromArray = (array: number[]) => {
        return array.filter(userId => userId !== userId);
    }

    const handleLikeClick = () => {
        if (likedUsers.includes(userId)) { //user has already liked
            updateLikesDislikesMutation.mutate(
                {
                    id: answer.id,
                    likedUsers: removeUserFromArray(likedUsers),
                    dislikedUsers
                }
            );
        } else { //user likes now
            updateLikesDislikesMutation.mutate(
                {
                    id: answer.id,
                    likedUsers: addUserToArray(likedUsers),
                    dislikedUsers: dislikedUsers.includes(userId) ? removeUserFromArray(dislikedUsers) : dislikedUsers
                }
            );
        }
    }

    const handleDislikeClick = () => {
        if (dislikedUsers.includes(userId)) { //user has already disliked
            updateLikesDislikesMutation.mutate(
                {
                    id: answer.id,
                    dislikedUsers: removeUserFromArray(dislikedUsers),
                    likedUsers
                }
            );
        } else { //user dislikes now
            updateLikesDislikesMutation.mutate(
                {
                    id: answer.id,
                    dislikedUsers: addUserToArray(dislikedUsers),
                    likedUsers: likedUsers.includes(userId) ? removeUserFromArray(likedUsers) : likedUsers
                }
            );
        }
    }

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
                    <Hidden smDown>
                        <DateTime date={date} time={time}/>
                    </Hidden>
                    <LikeDislikeIcons likedUsers={likedUsers} dislikedUsers={dislikedUsers} userId={userId}/>
                </Box>
            </CardContent>
            <CardContent sx={{backgroundColor: '#F9F9F9'}}>
                <Typography variant="body2">{answer.body}</Typography>
            </CardContent>
            <LikeDislikeActions onLikeClick={handleLikeClick} onDislikeClick={handleDislikeClick}/>
        </Card>
    );
}
