import {Alert, AlertTitle, Container} from "@mui/material";

export default function Error({message}: { message: string }) {
    return (
        <Container>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {message}
            </Alert>
        </Container>
    )
}