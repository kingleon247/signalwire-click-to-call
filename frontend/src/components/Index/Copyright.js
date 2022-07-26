import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import MxLink from '@/components/MxLink'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'

const StyledLink = styled(Link)({
	color: 'grey',
	textDecoration: 'none ',
})

const Copyright = ({ user, logout }) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid
				container
				direction={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}
				sx={{
					fontSize: 14,
					fontWeight: 500,
				}}
			>
				<Grid item flexDirection={'auto'} sx={{ textAlign: 'right' }}>
					{'Copyright © '}
					<StyledLink color='inherit' href='https:mui.com/'>
						Your Website
					</StyledLink>{' '}
					{new Date().getFullYear()}
					{'.'}
				</Grid>
				<Grid item>

					{user ? (
						<>
							<StyledLink component={MxLink} color='inherit' href={'/dashboard'} sx={{ mr: 1.5 }}>
								Dashboard
							</StyledLink>
							<StyledLink component={Link} onClick={logout} style={{ cursor: 'pointer' }}>logout</StyledLink>
						</>
					) : (
						<>
							<StyledLink component={MxLink} color='inherit' href={'/login'} sx={{ mr: 1.5 }}>
								Login
							</StyledLink>
							<StyledLink component={MxLink} color='inherit' href={'/register'}>
								Register
							</StyledLink>
						</>
					)}
				</Grid>
			</Grid>
		</Box>
	)
}

export default Copyright
