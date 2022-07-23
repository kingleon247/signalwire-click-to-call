import React, {useEffect, useState}  from "react";
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Calls from '@/components/Dashboard/Calls'
import AuthLayout from "@/components/Layouts/AuthLayout"
import Head from "next/head"
import axios from "@/lib/axios";
import useSWR from "swr";

const Dashboard = () => {
    const [callsData, setCallsData] = useState(false)
    const [isLoading, setLoading] = useState(false)

    console.log('dashboard - callsData: ', callsData)

    useEffect(() => {
        // setLoading(true)

        // const { calls } = useSWR('/api/calls', () =>
        //     axios
        //         .post('/api/calls')
        //         // .then(res => res.data)
        //         // .catch(error => {
        //         //     if (error.response.status !== 409) throw error
        //         //
        //         //     router.push('/verify-email')
        //         // }),
        // )

        axios.post('/api/calls')
            .then(res => setCallsData(res.data))

        // axios
        //     .post('/api/user')
        //     .then(res => res.data)
        //     .catch(error => {
        //         if (error.response.status !== 409) throw error
        //
        //         router.push('/verify-email')
        //     })

        // axios
        //     .get('/api/calls')
        //     .then(res => res.data)
        //     .catch(error => {
        //         if (error.response.status !== 409) throw error
        //
        //         router.push('/verify-email')
        //     })

        // fetch('/api/calls')
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setData(data)
        //         setLoading(false)
        //         console.log('Dashboard - data: ', data)
        //     })
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
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        {/* Recent Calls */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Calls callsData={callsData}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </AuthLayout>

    )
}

export default Dashboard
