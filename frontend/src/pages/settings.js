import React, {useEffect, useState} from "react"
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {useTheme} from "@mui/material/styles"
import AuthLayout from "@/components/Layouts/AuthLayout"
import Head from "next/head"
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import axios from "axios";

const Settings = (props) => {
	const [callsData, setCallsData] = useState(false)
	const [isLoading, setLoading] = useState(false)

	const theme = useTheme()


	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		console.log('Settings - formData: ', formData)
		console.log('Settings - ', {
			project_id: formData.get("project_id"),
			token: formData.get("token"),
			space_url: formData.get("space_url"),
			signalwire_number: formData.get("signalwire_number"),
			forwarding_number: formData.get("forwarding_number"),
			business_name: formData.get("business_name"),
		});
		const values = {...formData.entries()};
		console.log('Settings - values: ', values)
		// axios.post()
	};

	return (
		<AuthLayout>
			<Head>
				<title>Settings</title>
			</Head>
			<Box
				component="main"
				sx={{

					// display: { xs: 'none', sm: 'block' },
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

				<Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
					<Grid container spacing={3}>

						{/* Recent Calls */}
						<Grid item xs={12}>
							<Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>

								<Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={6}>
											<TextField
												name="project_id"
												fullWidth
												id="project_id"
												label="Project Id"
												autoFocus
												variant="standard"
												defaultValue="c74baf17-d94d-4905-9f83-288875412584"
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												name="token"
												fullWidth
												id="token"
												label="Token"
												autoFocus
												variant="standard"
												defaultValue="PT08287916f7b1c1126ee475fgredfgt06ef85bcced200ec44"
											/>
										</Grid>
										<Grid item xs={12} sm={6} md={4} lg={3}>
											<TextField
												name="space_url"
												fullWidth
												id="space_url"
												label="Space Url"
												autoFocus
												variant="standard"
												defaultValue="webkundo.signalwire.com"
											/>
										</Grid>
										<Grid item xs={6} sm={6} md={4} lg={3}>
											<TextField
												name="signalwire_number"
												fullWidth
												id="signalwire_number"
												label="Signalwire Number"
												autoFocus
												variant="standard"
												defaultValue="12403325366"
											/>
										</Grid>
										<Grid item xs={6} sm={6} md={4} lg={3}>
											<TextField
												name="forwarding_number"
												fullWidth
												id="forwarding_number"
												label="Forwarding Number"
												autoFocus
												variant="standard"
												defaultValue="14434588612"
											/>
										</Grid>
										<Grid item xs={12} sm={6} md={4} lg={3}>
											<TextField
												name="business_name"
												fullWidth
												id="business_name"
												label="Business Name"
												autoFocus
												variant="standard"
												defaultValue="Perfect Painters"
											/>
										</Grid>
									</Grid>
									<Button
										type="submit"
										variant="contained"
										sx={{mt: 3, mb: 2, float: 'right'}}
									>
										Update
									</Button>
								</Box>

							</Paper>
						</Grid>

					</Grid>
				</Container>
			</Box>
		</AuthLayout>

	)
}

export default Settings
