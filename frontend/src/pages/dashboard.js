import React, {useEffect, useState} from "react"
import Head from "next/head"
import Link from "next/link";
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {CircularProgress} from "@mui/material"
import { styled } from '@mui/material/styles'
import ErrorIcon from "@mui/icons-material/ErrorOutline"
import axios from "../lib/axios"
import Calls from '../components/Dashboard/Calls'
import AuthLayout from "../components/Layouts/AuthLayout"
import MxLink from "../components/MxLink";

const StyledLink = styled(Link)({
	color: 'grey',
	textDecoration: 'none ',
})

function displayCalls(callsData) {
	return (
		<Container maxWidth='xl' sx={{mt: 4, mb: 4}}>
			<Grid container spacing={3}>

				{/* Recent Calls */}
				<Grid item xs={12}>
					<Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
						<Calls callsData={callsData}/>

					</Paper>
				</Grid>

			</Grid>
		</Container>
	)
}

function displaySpinner() {
	return (
		<Box sx={{flexGrow: 1}}>
			<Grid container spacing={2} sx={{textAlign: 'center', pt: '25%', pb: '75%'}}>
				<Grid item xs={12}>
					<CircularProgress sx={{color: '#80808085'}}/>
				</Grid>
			</Grid>
		</Box>
	)
}

function displayError(error) {
	return (
		<Box sx={{flexGrow: 1}}>
			<Grid container spacing={2} sx={{textAlign: 'center', pt: '25%', pb: '75%'}}>
				<Grid item xs={12}>
					<ErrorIcon sx={{ mb: '-10px', mr: '2px', fontSize: '30px' }}/>
					{error}{' - '}
					<StyledLink component={MxLink} color='inherit' href={'/settings'} sx={{ mr: 1.5 }}>
						Your settings keys may not be configured properly.
					</StyledLink>
				</Grid>
			</Grid>
		</Box>
	)
}

const Dashboard = () => {
	const [callsData, setCallsData] = useState(false)
	const [isLoading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	console.log('error', error)

	useEffect(() => {
		axios.post('/api/calls')
			.then(res => {
				setCallsData(res.data)
				setLoading(false)
			})
			.catch(function (error) {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					// console.log('error.response', error.response.data)
					console.log('setting error message')
					setError(error.response.data.error)
					setLoading(false)
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.log('error.request', error.request)
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log('Error', error.message)
				}
			})
	}, [])

	return (
		<AuthLayout>
			<Head>
				<title>Dashboard</title>
			</Head>
			<Box
				component="main"
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
				<Toolbar/>

				{/* Main Content */}
				{ isLoading ? displaySpinner() : (error ? displayError(error) : displayCalls(callsData)) }
			</Box>
		</AuthLayout>

	)
}

export default Dashboard
