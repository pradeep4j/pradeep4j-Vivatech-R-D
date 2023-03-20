import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';


const Home = () => {
    return (
        <Container maxWidth="lg">
            <Box my={5}>
                 <Typography variant="h3" component="h2" align="center">React JS Task Card</Typography>
            </Box>
        </Container>
    )
}

export default Home;