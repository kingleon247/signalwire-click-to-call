import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import PainterIcon from '@mui/icons-material/FormatPaint';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IphoneIcon from "@mui/icons-material/PhoneIphone";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Album() {
    return (
        <ThemeProvider theme={theme}>

            <CssBaseline />

            <AppBar
                position="relative"
                sx={{ height: 88, backgroundColor: '#099b9f'}}
                // sx={{ height: 88, backgroundColor: '#1accd1'}}
            >
                <Toolbar sx={{ mt: 1.5}}>
                    {/* Header Logo */}
                    <PainterIcon sx={{
                        // display: { xs: 'none', sm: 'flex' },
                        md: 'flex',
                        mr: { xs: .5, sm: 1},
                        fontSize: { xs: 30, sm: 44 }
                    }} />
                    <Typography
                        variant="h5"
                        color="inherit"
                        noWrap
                        sx={{
                            flexGrow: 1,
                            mr: 2,
                            fontSize: { xs: 16, sm: 28 },
                            // display: { xs: 'none', sm: 'flex' },
                            // fontFamily: 'monospace',
                            fontWeight: 500,
                            letterSpacing: '.001rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        GreatPainters
                    </Typography>



                    {/* Header Click To Call */}
                    <Button
                        href='tel:+15555555555'
                        color="inherit"
                        sx={{ fontSize: { xs: 12, sm: 18 } }}
                    >
                        <IphoneIcon
                            // xs={{ display: { sm: 'none' }}}
                            sx={{ fontSize: { xs: 14, sm: 22 } }}
                        />
                        (455) 555-5555
                    </Button>

                </Toolbar>
            </AppBar>

            <main >
                {/* Hero unit */}
                <Box
                    sx={{
                        backgroundImage: "linear-gradient(rgb(0 0 0 / 0%), #0f0f10e0), url('img/pexels-terry-magallanes-2988860.jpg')",
                        // backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('img/pexels-terry-magallanes-2988860.jpg')",
                        // backgroundImage: "url('/img/pexels-pixabay-271816.jpg')",
                        backgroundSize: 'cover',
                        height: '101vh',
                        overflow: 'hidden',
                        backgroundPosition: 'center top',
                        // bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm" >
                        <Typography
                            sx={{
                                mt: 2,
                                mb: 6,
                                fontSize: { xs: '3rem', sm: '3.75rem' },
                                color: '#ffffff',
                                fontWeight: 400
                            }}
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Talk to an amazing painter today!
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            // color="text.secondary"
                            color='#f9e8e8'
                            paragraph
                            sx={{ fontSize: { xs: '1.3rem', sm: '1.5rem' }  }}
                        >
                            GreatPainters is the <Typography
                                variant="span"
                                sx={{ mt: 33 }}
                                color="#f9e8e8"
                                fontSize={22}
                                fontWeight={'bold'}
                            >
                                #1
                            </Typography> choice for a fresh update to your largest asset... your home! Call to get a free virtual or on-site estimate today!
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button
                                variant="contained"
                                // sx={{ backgroundColor: '#07b0c1' }}
                                // sx={{ backgroundColor: '#a37413' }}
                                sx={{ backgroundColor: '#68a313' }}
                            >
                                Click to Call Now!
                            </Button>
                            {/*<Button variant="outlined">Secondary action</Button>*/}
                        </Stack>
                    </Container>
                </Box>


                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image="https://source.unsplash.com/random"
                                        alt="random"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Heading
                                        </Typography>
                                        <Typography>
                                            This is a media card. You can use this section to describe the
                                            content.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">View</Button>
                                        <Button size="small">Edit</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}
        </ThemeProvider>
    );
}
