import {Box, CircularProgress} from "@mui/material";

function Loading() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100%"
            position="fixed"
            top={0}
            right={0}
        >
            <CircularProgress style={{width: '4rem', height: '4rem'}} color="primary"/>
        </Box>
    )
}

export default Loading;