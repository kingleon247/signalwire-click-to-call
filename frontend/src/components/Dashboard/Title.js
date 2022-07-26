import * as React from 'react';
import Typography from '@mui/material/Typography';


export const Title = (props) => {
    return (
        <Typography component="h2" variant="h6" color="#00000099" gutterBottom>
            {props.children}
        </Typography>
    );
}
