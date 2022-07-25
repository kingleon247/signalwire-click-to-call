import React, {useEffect, useState}  from "react";
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {useTheme} from "@mui/material/styles";
import Calls from '@/components/Dashboard/Calls'
import AuthLayout from "@/components/Layouts/AuthLayout"
import Head from "next/head"
import axios from "@/lib/axios";
import useSWR from "swr";
import { dataTableData } from "@/components/pagination/dataTableData";

const Dashboard = (props) => {
    const [callsData, setCallsData] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const theme = useTheme();

    console.log('dashboard - props: ', props)
    console.log('dashboard - theme: ', theme)
    console.log('dashboard - dataTableData: ', dataTableData)

    useEffect(() => {
        setCallsData(dataTableData)
        // axios.post('/api/calls')
        //     .then(res => setCallsData(res.data))
    }, [])

    return (
        <AuthLayout>
            <Head>
                <title>Dashboard</title>
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
                <Toolbar />

                <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>

                        {/* Recent Calls */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                {callsData && <Calls callsData={callsData}/>}

                            </Paper>
                        </Grid>

                    </Grid>
                </Container>
            </Box>
        </AuthLayout>

    )
}

export default Dashboard
