import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { format } from 'date-fns'

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const remove = [
    createData(
        0,
        '16 Mar, 2019',
        'Elvis Presley',
        'Tupelo, MS',
        'VISA ⠀•••• 3719',
        312.44,
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Paul McCartney',
        'London, UK',
        'VISA ⠀•••• 2574',
        866.99,
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(
        3,
        '16 Mar, 2019',
        'Michael Jackson',
        'Gary, IN',
        'AMEX ⠀•••• 2000',
        654.39,
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Bruce Springsteen',
        'Long Branch, NJ',
        'VISA ⠀•••• 5919',
        212.79,
    ),
];

function preventDefault(e) {
    e.preventDefault();
}

const Calls = ({callsData}) => {
    console.log('Calls - callsData: ', callsData)
    return (
        <React.Fragment>
            <Title>Recent Calls</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>From</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell align='right'>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {callsData.calls?.map((call) => {
                        const formatDate = (dateString) => {
                            const dateTime = new Date(dateString)
                            const timeOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }
                            return dateTime.toLocaleTimeString('en-US', timeOptions)
                        }
                        const formatDuration = (seconds) => {
                            return new Date(seconds * 1000).toISOString().slice(11, 19)
                        }

                        return(
                            <TableRow key={call.index}>
                                <TableCell>{call.formatted_from}</TableCell>
                                <TableCell>{formatDate(call.start_time)}</TableCell>
                                <TableCell>{formatDuration(call.duration)}</TableCell>
                                <TableCell align="right">{call.status}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    );
}

export default Calls
