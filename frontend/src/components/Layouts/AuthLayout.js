import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from '@/components/Dashboard/listItems';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useAuth} from "@/hooks/auth";
import MxLink from "@/components/MxLink";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LandingPageIcon from '@mui/icons-material/Monitor';
import LogoutIcon from '@mui/icons-material/Logout';
import PainterIcon from "@mui/icons-material/FormatPaint";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 180;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer2 = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const DrawerContent = ({ toggleDrawer }) => (
    <>
        <Toolbar
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
            }}
        >

            {/* Header Logo */}
            <PainterIcon sx={{
                md: 'flex',
                mr: '4px',
                fontSize: 28
            }} />
            <Typography
                variant="h5"
                color="inherit"
                noWrap
                sx={{
                    flexGrow: 1,
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: '.001rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                GreatPainters
            </Typography>
        </Toolbar>
        <Divider />
        <List component="nav">
            {mainListItems}
        </List>
    </>
)

const AuthLayout = ({children}, ...props) => {
    const { user } = useAuth({ middleware: 'auth' })
    const { logout } = useAuth()
    const { window } = props;
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: '#099b9f'
                }}
            >
                <Toolbar
                    // sx={{
                    //     pr: '24px', // keep right padding when drawer closed
                    // }}
                >
                    <IconButton
                        // size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Dashboard
                    </Typography>


                    <div>
                        <Typography variant='p'>{user?.name}</Typography>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem component={MxLink} href={'/dashboard'}><DashboardIcon sx={{ fontSize: 18, mr: 1, color: 'gray' }} /> Dashboard</MenuItem>
                            <MenuItem component={MxLink} href={'/settings'}><SettingsIcon sx={{ fontSize: 18, mr: 1, color: 'gray' }} /> Settings</MenuItem>
                            <MenuItem component={MxLink} href={'/'}><LandingPageIcon sx={{ fontSize: 18, mr: 1, color: 'gray' }} /> Landing Page</MenuItem>
                            <Divider sx={{ my: 0.5 }} />
                            <MenuItem onClick={logout}><LogoutIcon sx={{ fontSize: 18, mr: 1, color: 'gray' }} /> Logout</MenuItem>
                        </Menu>
                    </div>

                </Toolbar>
            </AppBar>
            {/* Drawer */}
            <Drawer
                container={container}
                variant="temporary"
                open={open}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                <DrawerContent toggleDrawer={toggleDrawer}/>
            </Drawer>
            <Drawer2
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open={open}
            >
                <DrawerContent toggleDrawer={toggleDrawer}/>
            </Drawer2>

            {/* Main Content */}
            { children }
        </Box>
    );
}

export default AuthLayout
