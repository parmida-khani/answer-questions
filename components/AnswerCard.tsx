'use client'
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Hidden } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import jalaliMoment from 'jalali-moment';
import { IAnswer } from '@/models/IAnswer';
import LikeDislikeActions from '@/components/LikeDislikeActions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLikedDislikedUsers } from '@/api/answers';
import DateTime from '@/components/DateTime';
import LikeDislikeIcons from '@/components/LikeDislikeIcons';

export default function AnswerCard({ answer }: { answer: IAnswer }) {
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
            void queryClient.invalidateQueries(['answers',answer.problemId]);
            setLikedUsers([...data.likedUsers]);
            setDislikedUsers([...data.dislikedUsers]);
        },
    });

    const addUserToArray = (array: number[]) => [...array, userId];

    const removeUserFromArray = (array: number[]) => array.filter(id => id !== userId);

    const handleUpdateLikesDislikes = (
        id: number,
        newLikedUsers: number[],
        newDislikedUsers: number[]
    ) => {
        updateLikesDislikesMutation.mutate({
            id,
            likedUsers: newLikedUsers,
            dislikedUsers: newDislikedUsers,
        });
    };

    const handleLikeClick = () => {
        const newLikedUsers = likedUsers.includes(userId)
            ? removeUserFromArray(likedUsers)
            : addUserToArray(likedUsers);
        const newDislikedUsers = dislikedUsers.includes(userId)
            ? removeUserFromArray(dislikedUsers)
            : dislikedUsers;
        handleUpdateLikesDislikes(answer.id, newLikedUsers, newDislikedUsers);
    };

    const handleDislikeClick = () => {
        const newDislikedUsers = dislikedUsers.includes(userId)
            ? removeUserFromArray(dislikedUsers)
            : addUserToArray(dislikedUsers);
        const newLikedUsers = likedUsers.includes(userId)
            ? removeUserFromArray(likedUsers)
            : likedUsers;
        handleUpdateLikesDislikes(answer.id, newLikedUsers, newDislikedUsers);
    };

    const authorInfo = (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountCircleIcon fontSize="small" />
            <Typography variant="body1" sx={{ marginRight: 1 }}>
                {answer.author}
            </Typography>
        </Box>
    );

    const dateInfo = (
        <Hidden smDown>
            <DateTime date={date} time={time} />
        </Hidden>
    );

    return (
        <Card sx={{ width: '100%', my: 2, borderRadius: '5px', boxShadow: '0 0 5px lightgray' }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {authorInfo}
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                    {dateInfo}
                    <LikeDislikeIcons likedUsers={likedUsers} dislikedUsers={dislikedUsers} userId={userId} />
                </Box>
            </CardContent>
            <CardContent sx={{ backgroundColor: '#F9F9F9' }}>
                <Typography variant="body2">{answer.body}</Typography>
            </CardContent>
            <LikeDislikeActions onLikeClick={handleLikeClick} onDislikeClick={handleDislikeClick} />
        </Card>
    );
}
