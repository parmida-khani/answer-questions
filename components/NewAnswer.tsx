'use client'
import {Button, TextField, Typography, FormControl, FormHelperText} from "@mui/material";
import React, {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createAnswer} from "@/api/answers";
import {useParams} from 'next/navigation';

export default function NewAnswer() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [input, setInput] = useState<string>('')
    const params = useParams();
    const problemId = params.id;

    const queryClient = useQueryClient();
    const createAnswerMutation = useMutation({
        mutationFn: createAnswer,
        onSuccess: (data) => {
            queryClient.setQueryData(['answers', data.id], data);
            void queryClient.invalidateQueries(['answers', problemId], {exact: true});
            setIsSubmitted(false);
            setIsEmpty(false);
            setInput('');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input === '') {
            setIsEmpty(true);
            return;
        }
        setIsSubmitted(true);
        createAnswerMutation.mutate({
            body: input,
            problemId: problemId
        });
    };

    return (
        <div>
            <Typography variant="h6" sx={{fontWeight: 'bold', mt: 4}}>پاسخ خود را ثبت کنید</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth variant="outlined" error={isEmpty}>
                    <Typography variant="body2" my={2}>پاسخ خود را ثبت کنید</Typography>
                    <TextField
                        multiline
                        rows={5}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isSubmitted}
                        placeholder="متن پاسخ..."
                    />
                    {isEmpty && (
                        <FormHelperText sx={{textAlign: 'right', position: 'absolute', bottom: '-25px', right: 0}}>
                            لطفا موضوع را وارد کنید
                        </FormHelperText>
                    )}
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitted}
                    sx={{my: 5, backgroundColor: "#27AE60 !important", color: 'white', width: '200px'}}
                >
                    ارسال پاسخ
                </Button>
            </form>
        </div>
    )
}
