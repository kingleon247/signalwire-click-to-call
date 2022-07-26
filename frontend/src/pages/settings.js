import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from '@/lib/axios'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import TextField from '@mui/material/TextField'
import AuthLayout from '@/components/Layouts/AuthLayout'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import { CircularProgress } from '@mui/material'

const Settings = () => {
	const [settings, setSettings] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const [formLoading, setFormLoading] = useState(true)
	const [errors, setErrors] = useState(false)

	useEffect(() => {
		setFormLoading(true)
		axios.get('/api/settings/edit')
			.then(res => {
				setSettings(res.data[0])
				setFormLoading(false)
			})
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault()
		setIsLoading(true)
		const formData = new FormData(event.currentTarget)
		const data = {
			project_id: formData.get('project_id'),
			token: formData.get('token'),
			space_url: formData.get('space_url'),
			signalwire_number: formData.get('signalwire_number'),
			forwarding_number: formData.get('forwarding_number'),
		}
		axios.patch('/api/settings/update', data).then(res => {
			setIsLoading(false)
			setErrors([])
		}).catch(error => {
			if (error.response.status !== 422) throw error

			setErrors(Object.values(error.response.data)[1])
			setIsLoading(false)
		})
	}

	return (
		<AuthLayout>
			<Head>
				<title>Settings</title>
			</Head>
			<Box
				component='main'
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? theme.palette.grey[100]
							: theme.palette.grey[900],
					flexGrow: 2,
					height: '100vh',
					overflow: 'auto',
				}}
			>
				<Toolbar />

				<Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
					<Grid container spacing={3}>

						{!formLoading
							? <Grid item xs={12}><Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
								<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
									<Grid container spacing={2}>
										<Grid item xs={6} sm={6} md={4} lg={3}>
											<TextField
												name='signalwire_number'
												required
												fullWidth
												id='signalwire_number'
												label='Signalwire Number'
												variant='standard'
												placeholder='+15553335555'
												defaultValue={settings?.signalwire_number}
												error={errors.signalwire_number?.length > 0}
												helperText={errors.signalwire_number}
											/>
										</Grid>
										<Grid item xs={6} sm={6} md={4} lg={3}>
											<TextField
												name='forwarding_number'
												required
												fullWidth
												id='forwarding_number'
												label='Forwarding Number'
												variant='standard'
												placeholder='+15553335555'
												defaultValue={settings?.forwarding_number}
												error={errors.forwarding_number?.length > 0}
												helperText={errors.forwarding_number}
											/>
										</Grid>
										<Grid item xs={12} sm={6} md={4} lg={3}>
											<TextField
												name='space_url'
												required
												fullWidth
												id='space_url'
												label='Space Url'
												variant='standard'
												placeholder='XXXXX.signalwire.com'
												defaultValue={settings?.space_url}
												error={errors.space_url?.length > 0}
												helperText={errors.space_url}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												name='project_id'
												required
												fullWidth
												id='project_id'
												label='Project Id'
												variant='standard'
												placeholder='7b981d06-XXXX-XXXX-XXXX-XXXXXXXXXXXX'
												defaultValue={settings?.project_id}
												error={errors.project_id?.length > 0}
												helperText={errors.project_id}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												name='token'
												required
												fullWidth
												id='token'
												label='Token'
												variant='standard'
												placeholder='PTda745ebXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
												defaultValue={settings?.token}
												error={errors.token?.length > 0}
												helperText={errors.token}
											/>
										</Grid>
									</Grid>
									<LoadingButton
										type='submit'
										variant='contained'
										sx={{ mt: 3, mb: 2, float: 'right', backgroundColor: '#1976d2 !important' }}
										loading={isLoading}
										disabled={formLoading}
										loadingPosition='start'
										startIcon={<SaveIcon />}
									>
										Save
									</LoadingButton>

								</Box>
							</Paper>
							</Grid>

							: <Box sx={{ flexGrow: 1 }}>
								<Grid container spacing={2} sx={{ textAlign: 'center', pt: '25%', pb: '75%' }}>
									<Grid item xs={12}>
										<CircularProgress sx={{ color: '#80808085' }} />
									</Grid>
								</Grid>
							</Box>
						}

					</Grid>
				</Container>
			</Box>
		</AuthLayout>

	)
}

export default Settings
