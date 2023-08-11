'use client'
import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProblem } from '@/api/problems';

export default function CreateProblem({ open, handleClose }: { open: boolean; handleClose: Function }) {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const bodyRef = useRef<HTMLTextAreaElement | null>(null);

    const [isTitleEmpty, setIsTitleEmpty] = useState(false);
    const [isBodyEmpty, setIsBodyEmpty] = useState(false);

    const queryClient = useQueryClient();
    const createProblemMutation = useMutation({
        mutationFn: createProblem,
        onSuccess: (data) => {
            queryClient.setQueryData(['problems', data.id], data);
            void queryClient.invalidateQueries(['problems'], { exact: true });
            handleClose();
        },
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!titleRef.current?.value) {
            setIsTitleEmpty(true);
            return;
        }
        if (!bodyRef.current?.value) {
            setIsBodyEmpty(true);
            return;
        }
        createProblemMutation.mutate({
            title: titleRef.current?.value,
            body: bodyRef.current?.value,
        });
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{
                '& .MuiDialog-container': {
                    '& .MuiPaper-root': {
                        width: '100%',
                        maxWidth: '600px',
                    },
                },
            }}
        >
            <DialogTitle sx={{ fontWeight: 'bold' }}>ایجاد سوال جدید</DialogTitle>
            {createProblemMutation.isError && JSON.stringify(createProblemMutation.error)}
            <DialogContent sx={{ backgroundColor: '#F9F9F9' }}>
                <Typography my={1}>موضوع</Typography>
                <TextField
                    autoFocus
                    name="title"
                    margin="dense"
                    id="title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    inputRef={titleRef}
                    required
                    error={isTitleEmpty}
                    helperText={isTitleEmpty ? 'لطفا موضوع را وارد کنید' : ''}
                    onChange={() => setIsTitleEmpty(false)}
                    placeholder="مشکل در اجرای کد"
                />
                <Typography my={2}>متن سوال</Typography>
                <TextField
                    id="body"
                    name="body"
                    multiline
                    rows={5}
                    fullWidth
                    inputRef={bodyRef}
                    required
                    error={isBodyEmpty}
                    helperText={isBodyEmpty ? 'لطفا متن سوال را وارد کنید' : ''}
                    onChange={() => setIsBodyEmpty(false)}
                    placeholder="مشکل در اجرای کد"
                />
            </DialogContent>
            <DialogActions sx={{ backgroundColor: '#F9F9F9', pb: 3, px: 2 }}>
                <Button onClick={handleClose} sx={{ width: '100px' }}>
                    انصراف
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={createProblemMutation.isLoading || isTitleEmpty || isBodyEmpty}
                    sx={{ color: 'white', backgroundColor: '#27AE60 !important', width: '100px' }}
                >
                    {createProblemMutation.isLoading ? 'درحال ایجاد' : 'ایجاد سوال'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
