import React, {useRef, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Typography} from '@mui/material';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createProblem} from '@/api/problems';
import Error from '@/utils/Error';

export default function CreateProblem({open, handleClose}: { open: boolean; handleClose: Function }) {
    const [formState, setFormState] = useState({
        isTitleEmpty: false,
        isBodyEmpty: false,
        title: '',
        body: '',
    });

    const queryClient = useQueryClient();
    const createProblemMutation = useMutation({
        mutationFn: createProblem,
        onSuccess: (data) => {
            queryClient.setQueryData(['problems', data.id], data);
            void queryClient.invalidateQueries(['problems'], {exact: true});
            handleClose();
        },
    });

    function handleCancel() {
        setFormState({
            isTitleEmpty: false,
            isBodyEmpty: false,
            title: '',
            body: '',
        });
        createProblemMutation.reset();
        handleClose();
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!formState.title) {
            setFormState({...formState, isTitleEmpty: true});
            return;
        }
        if (!formState.body) {
            setFormState({...formState, isBodyEmpty: true});
            return;
        }
        createProblemMutation.mutate({
            title: formState.title,
            body: formState.body,
        });
    }

    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            sx={{
                '& .MuiDialog-container': {
                    '& .MuiPaper-root': {
                        width: '100%',
                        maxWidth: '600px',
                    },
                },
            }}
        >
            <DialogTitle sx={{fontWeight: 'bold'}}>ایجاد سوال جدید</DialogTitle>
            {createProblemMutation.isError && <Error message={createProblemMutation.error.message}/>}
            <DialogContent sx={{backgroundColor: '#F9F9F9'}}>
                <Typography my={1}>موضوع</Typography>
                <TextField
                    autoFocus
                    name="title"
                    margin="dense"
                    id="title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formState.title}
                    required
                    error={formState.isTitleEmpty}
                    helperText={formState.isTitleEmpty ? 'لطفا موضوع را وارد کنید' : ''}
                    onChange={(e) => setFormState({...formState, title: e.target.value, isTitleEmpty: false})}
                    placeholder="مشکل در اجرای کد"
                />
                <Typography my={2}>متن سوال</Typography>
                <TextField
                    id="body"
                    name="body"
                    multiline
                    rows={5}
                    fullWidth
                    value={formState.body}
                    required
                    error={formState.isBodyEmpty}
                    helperText={formState.isBodyEmpty ? 'لطفا متن سوال را وارد کنید' : ''}
                    onChange={(e) => setFormState({...formState, body: e.target.value, isBodyEmpty: false})}
                    placeholder="مشکل در اجرای کد"
                />
            </DialogContent>
            <DialogActions sx={{backgroundColor: '#F9F9F9', pb: 3, px: 2}}>
                <Button onClick={handleCancel} sx={{width: '100px'}}>
                    انصراف
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={createProblemMutation.isLoading || formState.isTitleEmpty || formState.isBodyEmpty}
                    sx={{color: 'white', backgroundColor: '#27AE60 !important', width: '100px'}}
                >
                    {createProblemMutation.isLoading ? 'درحال ایجاد' : 'ایجاد سوال'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
