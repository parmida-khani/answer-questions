import { Button, TextField, Typography, FormControl, FormHelperText } from "@mui/material";
import React, { useRef, useState } from "react";

export default function NewAnswer() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const bodyRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!bodyRef.current?.value) {
            setIsEmpty(true);
            return;
        }
        console.log('Submitted:');
        setIsSubmitted(true);
    };

    return (
        <div>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 4 }}>پاسخ خود را ثبت کنید</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth variant="outlined" error={isEmpty}>
                    <Typography variant="body2" my={2}>پاسخ خود را ثبت کنید</Typography>
                    <TextField
                        multiline
                        rows={5}
                        inputRef={bodyRef}
                        onChange={() => setIsEmpty(false)}
                        disabled={isSubmitted}
                        placeholder="متن پاسخ..."
                    />
                    {isEmpty && (
                        <FormHelperText sx={{ textAlign: 'right', position: 'absolute', bottom: '-25px', right: 0 }}>
                            لطفا موضوع را وارد کنید
                        </FormHelperText>
                    )}
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitted}
                    sx={{ my: 5, backgroundColor: "#27AE60 !important", color: 'white', width:'200px' }}
                >
                    ارسال پاسخ
                </Button>
            </form>
        </div>
    )
}
