import * as React from 'react'
import {useRouter} from "next/router"
import {styled} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'
import LandingPageIcon from '@mui/icons-material/Monitor'
import LogoutIcon from '@mui/icons-material/Logout'
import {useAuth} from "../../hooks/auth"
import DrawerContent from "components/DrawerContent"
import MxLink from "../MxLink"

const drawerWidth = 180

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
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
}))

const Drawer2 = styled(Drawer, {shouldForwardProp: (prop) => prop !== 'open'})(
	({theme, open}) => ({
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
)



const AuthLayout = ({children}, ...props) => {
	const {user} = useAuth({middleware: 'auth'})
	const {logout} = useAuth()
	const {window} = props
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [open, setOpen] = React.useState(false)

	function getPageName(route) {
		switch (route) {
			case '/settings':
				return 'Settings'
			case '/dashboard':
				return 'Dashboard'
		}
	}

	function toggleDrawer() {
		setOpen(!open)
	}

	function handleDrawerToggle() {
		setOpen(!open)
	}

	function handleMenu(e) {
		setAnchorEl(e.currentTarget)
	}

	function handleClose() {
		setAnchorEl(null)
	}

	const container = window !== undefined ? () => window().document.body : undefined
	const router = useRouter()

	// console.log('AuthLayout - router.pathname: ', router.pathname)

	return (
		<Box sx={{display: 'flex'}}>
			<CssBaseline/>
			{/* AppBar */}
			<AppBar
				position="fixed"
				sx={{
					width: {sm: `calc(100% - ${drawerWidth}px)`},
					ml: {sm: `${drawerWidth}px`},
					backgroundColor: '#099b9f'
				}}
			>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={toggleDrawer}
						sx={{mr: 2, display: {sm: 'none'}}}
					>
						<MenuIcon/>
					</IconButton>
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						sx={{flexGrow: 1}}
					>
						{getPageName(router.pathname)}
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
							<AccountCircle/>
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
							<MenuItem component={MxLink} href={'/dashboard'}>
								<DashboardIcon sx={{fontSize: 18, mr: 1, color: 'gray'}}/> Dashboard
							</MenuItem>
							<MenuItem component={MxLink} href={'/settings'}>
								<SettingsIcon	sx={{fontSize: 18, mr: 1, color: 'gray'}}/> Settings
							</MenuItem>
							<MenuItem component={MxLink} href={'/'}>
								<LandingPageIcon	sx={{fontSize: 18, mr: 1, color: 'gray'}}/> Landing Page
							</MenuItem>
							<Divider sx={{my: 0.5}}/>
							<MenuItem onClick={logout}>
								<LogoutIcon sx={{fontSize: 18, mr: 1, color: 'gray'}}/> Logout
							</MenuItem>
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
					display: {xs: 'block', sm: 'none'},
					'& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
				}}
			>
				<DrawerContent
					toggleDrawer={toggleDrawer}
					pathName={router.pathname}
				/>
			</Drawer>
			<Drawer2
				variant="permanent"
				sx={{
					display: {xs: 'none', sm: 'block'},
					'& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
				}}
				open={open}
			>
				<DrawerContent
					toggleDrawer={toggleDrawer}
					pathName={router.pathname}
				/>
			</Drawer2>

			{/* Main Content */}
			{children}
		</Box>
	)
}

export default AuthLayout
