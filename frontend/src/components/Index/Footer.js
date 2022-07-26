import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Copyright from '@/components/Index/Copyright'
import * as React from 'react'
import { footerLinks } from '@/components/Index/footerLinks'

export const Footer = ({ user, logout }) => {
	return (
		<Container
			maxWidth={'md'}
			component={'footer'}
			sx={{
				borderTop: (theme) => `1px solid ${theme.palette.divider}`,
				mt: 8,
				mb: -1,
				py: [3, 6],
				ul: { margin: 0, padding: 0, listStyle: 'none', listStyleType: 'none', textDecoration: 'none' },
			}}
		>
			<Grid container spacing={4} justifyContent='space-evenly' sx={{ textAlign: 'center' }}>
				{footerLinks.map((footer) => (
					<Grid item xs={6} sm={3} key={footer.title} sx={{ mb: 4 }}>
						<Typography variant='h6' color='text.primary' gutterBottom>
							{footer.title}
						</Typography>
						<ul>
							{footer.description.map((item) => (
								<li key={item}>
									<Link href={item === 'Developer stuff' ? '#' : '#'} variant='subtitle1' color='text.secondary'
												sx={{ textDecoration: 'none', fontWeight: 'bold' }}>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</Grid>
				))}
			</Grid>
			<Copyright user={user} logout={logout} />
		</Container>
	)
}
