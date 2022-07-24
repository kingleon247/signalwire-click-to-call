import * as React from 'react';
import {useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import usePagination from "@/components/pagination/Pagination";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import {dataTableData} from "@/components/pagination/dataTableData";

// Generate Order Data
function formatDate (dateString) {
    const dateTime = new Date(dateString)
    const timeOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }
    return dateTime.toLocaleTimeString('en-US', timeOptions)
}
function formatDuration (seconds) {
    return new Date(seconds * 1000).toISOString().slice(11, 19)
}


function TablePaginationActions(props) {
    const theme = useTheme()
    const { count, page, rowsPerPage, onPageChange } = props

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0)
    }

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1)
    }

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1)
    }

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    )
}


function Calls ({callsData: {calls}}) {


    // // let [page, setPage] = useState(1)
    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(10);
    // const [data, setData] = React.useState([]);
    // const count = Math.ceil(calls.length / rowsPerPage)
    const paginationData = usePagination(calls, rowsPerPage)


    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    // function handleChangePage(e, newPage) {
    //     setPage(newPage);
    // }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    console.log('Calls - calls: ', calls)
    // console.log('Calls - count: ', count)
    console.log('Calls - page: ', page)
    console.log('Calls - rowsPerPage: ', rowsPerPage)
    console.log('Calls - paginationData: ', paginationData)

    return (
        <>
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
                    {
                        paginationData.activeData().map(call => {
                        // calls.map(call => {
                        return(
                            <TableRow key={call.sid}>
                                <TableCell>{call.formatted_from}</TableCell>
                                <TableCell>{formatDate(call.start_time)}</TableCell>
                                <TableCell>{formatDuration(call.duration)}</TableCell>
                                <TableCell align="right">{call.status}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

            <TableFooter>
                <TableRow>
                    {/*<TablePagination*/}
                    {/*    rowsPerPageOptions={[5, 10, 25]}*/}
                    {/*    count={count}*/}
                    {/*    rowsPerPage={rowsPerPage}*/}
                    {/*    page={page}*/}
                    {/*    SelectProps={{*/}
                    {/*        inputProps: {*/}
                    {/*            "aria-label": "rows per page"*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*    onPageChange={handleChangePage}*/}
                    {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
                    {/*    //ActionsComponent={TablePaginationActions}*/}
                    {/*    //component={Box}*/}
                    {/*    labelDisplayedRows={({ page }) => {*/}
                    {/*        return `Page: ${page}`;*/}
                    {/*    }}*/}
                    {/*    backIconButtonProps={{*/}
                    {/*        color: "secondary"*/}
                    {/*    }}*/}
                    {/*    nextIconButtonProps={{ color: "secondary" }}*/}
                    {/*    showFirstButton={true}*/}
                    {/*    showLastButton={true}*/}
                    {/*    labelRowsPerPage={<span>Rows:</span>}*/}
                    {/*    sx={{*/}
                    {/*        ".MuiTablePagination-toolbar": {*/}
                    {/*            backgroundColor: "rgba(100,100,100,0.5)"*/}
                    {/*        },*/}
                    {/*        ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {*/}
                    {/*            fontWeight: "bold",*/}
                    {/*            color: "blue"*/}
                    {/*        }*/}
                    {/*    }}*/}
                    {/*/>*/}
                </TableRow>
            </TableFooter>
            <TablePagination
                component="div"
                count={calls.length}
                page={page}
                ActionsComponent={TablePaginationActions}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}

export default Calls
