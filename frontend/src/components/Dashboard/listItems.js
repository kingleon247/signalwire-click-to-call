import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LandingPageIcon from '@mui/icons-material/Monitor';
import MxLink from "@/components/MxLink";

export const mainListItems = (
    <React.Fragment>
        <ListItemButton component={MxLink} href='/dashboard'>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton component={MxLink} href='/settings'>
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
        </ListItemButton>

        <ListItemButton component={MxLink} href='/'>
            <ListItemIcon>
                <LandingPageIcon />
            </ListItemIcon>
            <ListItemText primary="Landing Page" />
        </ListItemButton>
    </React.Fragment>
);
