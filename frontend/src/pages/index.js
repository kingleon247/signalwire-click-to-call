import * as React from 'react'
import Image from 'next/image'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import PainterIcon from '@mui/icons-material/FormatPaint'
import CssBaseline from '@mui/material/CssBaseline'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import IphoneIcon from "@mui/icons-material/PhoneIphone"
import { useAuth } from "../hooks/auth"
import axios from '../lib/axios'
import { Footer } from '../components/Index/Footer'
import bgImage from '../../public/img/pexels-terry-magallanes-2988860.jpg'
import {useEffect, useState} from "react";

const theme = createTheme()

const LandingPage = () => {
	const [numbers, setNumbers] = useState({business: '5555555555', businessFormatted: '(555) 555-5555'})
	const { logout } = useAuth()
	const { user } = useAuth()

	useEffect(() => {

		axios.get('/api/settings/business-number')
			.then(res => setNumbers(res.data.numbers))
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar
				position="relative"
				sx={{ height: 88, backgroundColor: '#099b9f'}}
			>
				<Toolbar sx={{ mt: 1.5 }}>
					{/* Header Logo */}
					<PainterIcon sx={{
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
							fontSize: { xs: 21, sm: 28 },
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
						href={`tel:${numbers?.business}`}
						color="inherit"
						sx={{ fontSize: { xs: 16, sm: 18 } }}
					>
						<IphoneIcon sx={{ fontSize: { xs: 20, sm: 22 } }} />
						{numbers?.businessFormatted}
					</Button>

				</Toolbar>
			</AppBar>

			{/* Main Content */}
			<main
				style={{
					// backgroundColor: 'red',
					backgroundImage: 'linear-gradient(rgb(0 0 0 / 0%), #0f0f10e0)',
					marginTop: '-88px',
				}}
			>

				<CssBaseline />
				<Image
					src={bgImage}
					alt={'Painted house'}
					width={'100vh'}
					height={'100vh'}
					layout="fill"
					priority
					style={{
						zIndex: -1,
						backgroundImage: 'linear-gradient(rgb(0 0 0 / 0%), #0f0f10e0)',
					}}
				/>
				{/* Hero unit */}
				<Box
					component='div'
					position='relative'
					sx={{
						height: '101vh',
						overflow: 'hidden',
						// backgroundPosition: 'center top',
						pt: 18,
						pb: 6,
					}}
				>
					{/* Main Content */}
					<Container maxWidth="sm" >
						{/* Main Headline */}
						<Typography
							sx={{
								mt: 2,
								mb: 6,
								fontSize: { xs: '3rem', sm: '3.75rem' },
								color: '#ffffff',
								fontWeight: 400,
								textShadow: '1px 1px 1px #3c5c5e'
							}}
							component="h1"
							variant="h2"
							align="center"
							color="text.primary"
							gutterBottom
						>
							Talk to an amazing painter today!
						</Typography>

						{/* Main Call to Action */}
						<Typography
							variant="h5"
							align="center"
							color='#ffffff'
							paragraph
							sx={{
								fontSize: { xs: '1.3rem', sm: '1.5rem' },
								textShadow: '1px 1px 1px #000000'
							}}
						>
							GreatPainters is the{' '}
							<Box
								component="span"
								sx={{ mt: 33 }}
								color='#c3d3cf'
								fontSize={22}
								fontWeight={'bold'}
							>
								#1
							</Box> choice for a fresh update to your largest asset... your home! Call to get a free virtual or on-site estimate today!
						</Typography>

						{/* Main Action Btn */}
						<Stack
							sx={{ pt: 4 }}
							direction="row"
							spacing={2}
							justifyContent="center"
						>
							<Button
								href={`tel:${numbers?.business}`}
								variant="contained"
								sx={{ backgroundColor: '#68a313' }}
							>
								Click to Call Now!
							</Button>
						</Stack>

					</Container>

				</Box>
			</main>

			{/* Footer */}
			<Footer user={user} logout={logout} />
		</ThemeProvider>
	)
}
export default LandingPage
