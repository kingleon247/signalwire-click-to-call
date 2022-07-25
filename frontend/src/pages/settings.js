import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import AuthLayout from '@/components/Layouts/AuthLayout'
import Head from 'next/head'
import { dataTableData } from '@/components/pagination/dataTableData'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import axios from 'axios'

const Settings = (props) => {
    const [callsData, setCallsData] = useState(false)
    const [isLoading, setLoading] = useState(true)

    const theme = useTheme()

    console.log('Settings - props: ', props)

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

                {/*{true ? */}
                    <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>

                            {/* Recent Calls */}
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <div>hello</div>

                                </Paper>
                            </Grid>

                        </Grid>
                    </Container>

                {/*    : <Box sx={{ flexGrow: 1 }}>*/}
                {/*        <Grid container spacing={2} sx={{ textAlign: 'center', pt: '25%', pb: '75%' }}>*/}
                {/*            <Grid item xs={12}>*/}
                {/*                <CircularProgress sx={{ color: '#80808085' }} />*/}
                {/*            </Grid>*/}
                {/*        </Grid>*/}
                {/*    </Box>*/}
                {/*}*/}
            </Box>
        </AuthLayout>

    )
}

export default Settings
