import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LandingPageIcon from '@mui/icons-material/Monitor';
import MxLink from "@/components/MxLink";

export const mainListItems = (
    <>
        <ListItemButton component={MxLink} href='/dashboard'>
            <ListItemIcon sx={{ minWidth: 32 }}>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={MxLink} href='/settings'>
            <ListItemIcon sx={{ minWidth: 32 }}>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
        </ListItemButton>

        <ListItemButton component={MxLink} href='/'>
            <ListItemIcon sx={{ minWidth: 32 }}>
                <LandingPageIcon />
            </ListItemIcon>
            <ListItemText primary="Landing Page" />
        </ListItemButton>
    </>
);
