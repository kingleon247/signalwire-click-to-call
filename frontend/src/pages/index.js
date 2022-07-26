import * as React from 'react'
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
import { useAuth } from "@/hooks/auth"
import axios from '@/lib/axios'
import { Footer } from '@/components/Index/Footer'

const theme = createTheme()

const LandingPage = ({ numbers }) => {
	const { logout } = useAuth()
	const { user } = useAuth()

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar
				position="relative"
				sx={{ height: 88, backgroundColor: '#099b9f'}}
			>
				<Toolbar sx={{ mt: 1.5}}>
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
						href={`tel:${numbers.business}`}
						color="inherit"
						sx={{ fontSize: { xs: 16, sm: 18 } }}
					>
						<IphoneIcon sx={{ fontSize: { xs: 20, sm: 22 } }} />
						{numbers.businessFormatted}
					</Button>

					</Toolbar>
			</AppBar>

			{/* Main Content */}
			<main >
				{/* Hero unit */}
				<Box
					sx={{
						backgroundImage: "linear-gradient(rgb(0 0 0 / 0%), #0f0f10e0), url('img/pexels-terry-magallanes-2988860.jpg')",
						backgroundSize: 'cover',
						height: '101vh',
						overflow: 'hidden',
						backgroundPosition: 'center top',
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
							color='#f9e8e8'
							paragraph
							sx={{ fontSize: { xs: '1.3rem', sm: '1.5rem' }  }}
						>
							GreatPainters is the{' '}
							<Typography
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
								href={`tel:${numbers.business}`}
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

// This function gets called at build time
export async function getStaticProps() {
	// Call backend API endpoint to get signalwire number to statically display on landing page
	const numbers = await axios
		.get('/api/settings/business-number')
		.then(res => res.data.numbers)
	return {
		props: {
			numbers,
		},
	}
}
